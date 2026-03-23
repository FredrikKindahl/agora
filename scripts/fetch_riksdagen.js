const fs = require('fs');

async function fetchAndProcessVotes() {
    console.log("Fetching recent votes from Riksdagen API (this might take a few seconds)...");
    
    // We fetch a larger size to ensure we get full groups of votes (there are 349 MPs)
    const url = "https://data.riksdagen.se/voteringlista/?sz=5000&utformat=json";
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        const votes = data.voteringlista.votering;
        
        console.log(`Fetched ${votes.length} individual MP votes. Processing...`);
        
        // Group by votering_id
        const polls = {};
        
        for (const vote of votes) {
            const vid = vote.votering_id;
            if (!polls[vid]) {
                polls[vid] = {
                    id: vid,
                    title: `Committee Report ${vote.beteckning}, Point ${vote.punkt}`,
                    description: `Parliamentary vote regarding: ${vote.avser || 'Legislative matter'}.`,
                    created_at: vote.systemdatum,
                    parliament_vote: { yes: 0, no: 0, abstain: 0, absent: 0 },
                    // Mock data for the people's vote to demonstrate the AGORA concept
                    people_vote: generateMockPeopleVote()
                };
            }
            
            const r = vote.rost.toLowerCase();
            if (r === 'ja') polls[vid].parliament_vote.yes++;
            else if (r === 'nej') polls[vid].parliament_vote.no++;
            else if (r === 'avstår') polls[vid].parliament_vote.abstain++;
            else if (r === 'frånvarande') polls[vid].parliament_vote.absent++;
        }
        
        // Convert to array and calculate percentages
        const results = Object.values(polls).map(poll => {
            const pv = poll.parliament_vote;
            const  total = pv.yes + pv.no + pv.abstain;
            
            // Only include votes with actual participation
            if (total > 0) {
                poll.parliament_percentage = {
                    yes: Math.round((pv.yes / total) * 100),
                    no: Math.round((pv.no / total) * 100)
                };
                
                // Calculate the "Gap" (difference in YES votes)
                poll.gap = Math.abs(poll.people_vote.yes - poll.parliament_percentage.yes);
                return poll;
            }
            return null;
        }).filter(p => p !== null && p.parliament_vote.yes + p.parliament_vote.no > 50); // Filter out minor/error votes
        
        // Sort by date descending and take top 10
        results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const finalData = results.slice(0, 10);
        
        // Ensure some titles are more descriptive for the demo
        if (finalData.length > 0) {
            finalData[0].title = "Should Sweden restore wetlands to combat climate change?";
            finalData[0].description = "Proposal to aggressively fund the restoration of drained wetlands to increase carbon capture.";
            
            if (finalData.length > 1) {
                finalData[1].title = "Implement stronger privacy laws for digital communications?";
                finalData[1].description = "A bill regarding the state's ability to intercept private digital messages without suspicion of severe crime.";
            }
            
            if (finalData.length > 2) {
                finalData[2].title = "Increase funding for independent journalism?";
                finalData[2].description = "Proposal to provide state subsidies to local independent investigative journalism.";
            }
        }
        
        fs.writeFileSync('data.json', JSON.stringify(finalData, null, 2));
        console.log(`Successfully generated data.json with ${finalData.length} aggregated polls.`);
        
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

function generateMockPeopleVote() {
    // Generate realistic looking split percentages
    const yes = Math.floor(Math.random() * 60) + 20; // 20% to 80%
    return {
        yes: yes,
        no: 100 - yes
    };
}

fetchAndProcessVotes();
