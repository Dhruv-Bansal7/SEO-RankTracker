import { getKeywordRank } from "@/libs/rankingFunctions";
import { Keyword } from "@/models/Keyword";
import { Result } from "@/models/Result";
import mongoose from "mongoose";
import cron from "node-cron"

async function checkAndSaveRanks() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const keywordsDocs = await Keyword.find();
        const googleSearchPromises = [];
        const savePromises = []; 

        for(const keywordDoc of keywordsDocs) {

            const googleSearchPromise = getKeywordRank(keywordDoc.domain,keywordDoc.keyword);
            googleSearchPromises.push(googleSearchPromise);
            googleSearchPromise.then(rank => {
                console.log({rank});
                const savePromise = Result.create({
                    domain: keywordDoc.domain,
                    keyword: keywordDoc.keyword,
                    position : rank,
                });
                savePromises.push(savePromise);
            });
        }

        await Promise.allSettled([...googleSearchPromises, ...savePromises]);
        console.log('Rank updates completed successfully.');
    } catch(err) {
        console.error('Error while updating ranks:', err);
    }
}

cron.schedule('0 0 * * *' , () => {
    console.log('Running scheduled keyword rank update at 12:00 AM');
    checkAndSaveRanks();    
})


export async function GET() {
    checkAndSaveRanks();

    return Response.json({success : true}); 
}

