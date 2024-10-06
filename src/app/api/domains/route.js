import { Domain } from "@/models/Domain";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import axios from "axios";
import { JSDOM } from "jsdom"
import { URL } from 'url'
import { Keyword } from "@/models/Keyword";
import { Result } from "@/models/Result";

async function getIconUrl(domain) {

    const response = await axios.get(`https://` + domain);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    const links = document.querySelectorAll('link');
    let href = '';
    
    links.forEach((link) => {
        const rel = link.getAttribute('rel') || '';
        if (rel.includes('icon')) {
            href = link.getAttribute('href');
        }
    });

    
    if (href.includes('://')) return href;
    else return `https://` + domain + href;
}

export async function POST(req) {
    const data = await req.json();
    await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    const session = await getServerSession(authOptions);
    let icon = null;
    
    try {
        icon = await getIconUrl(data?.domain)
    }
    catch(e){
        console.error(e);
    }
    const doc = await Domain.create({
        domain : data?.domain,
        owner : session?.user?.email,
        icon,
    });
    return Response.json(doc);
}

export async function GET() {
    await mongoose.connect(process.env.MONGODB_URI)
    const session = await getServerSession(authOptions);
    const domains = await Domain.find({owner : session.user?.email});
    
    const keywords = await Keyword.find({
        owner : session.user?.email, 
        domain:domains.map(doc => doc.domain),
    });
    const results = await Result.find({
        domain : domains.map(doc => doc.domain),
        keyword : keywords.map(doc => doc.keyword)
    });
    return Response.json(
        {domains , keywords,results} 
    )
}



export async function DELETE(req) {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    const url = new URL(req.url);   
    const domain = url.searchParams.get('domain')
    const session = await getServerSession(authOptions);
    await Domain.deleteOne({owner : session.user?.email , domain})
    return Response.json(true);
}