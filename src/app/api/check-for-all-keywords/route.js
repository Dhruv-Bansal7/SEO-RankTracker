import { getKeywordRank } from "@/libs/rankingFunctions";
import { Keyword } from "@/models/Keyword";
import { Result } from "@/models/Result";
import mongoose from "mongoose";
import cron from "node-cron"


async function connectToDB() {
    if(mongoose.connection.readyState === 0){
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected To MongoDB");
    }
}

async function checkAndSaveRanks() {
    try {
        await connectToDB();
        const keywordsDocs = await Keyword.find();
        const googleSearchPromises = keywordsDocs.map(async (keywordsDoc) => {
            const rank = await getKeywordRank(keywordsDoc.domain , keywordsDoc.keyword);
            console.log({rank})
            return Result.create({
                domain : keywordsDoc.domain,
                keyword : keywordsDoc.keyword,
                position : rank,
            });
        });

        await Promise.allSettled(googleSearchPromises);
        console.log("Rank updates completed Succesfully");
    } catch(err) {
        console.error('Error while updating ranks:', err);
    }
}

cron.schedule('0 0 * * *' , () => {
    console.log('Running scheduled keyword rank update at 12:00 AM');
    checkAndSaveRanks();
})


export async function GET() {
    await checkAndSaveRanks();
    return new Response(JSON.stringify({succcess : true}) , {status : 200});
}

