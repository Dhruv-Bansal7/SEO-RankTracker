export async function POST(req) {
    const json = await req.json();
    console.log(json);
    return Response.json(true);
}