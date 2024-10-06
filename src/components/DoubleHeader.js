import Link from "next/link";

export default function DoubleHeader({preTitle ,mainTitle,preTitleLink}) {
    return (
        <div>
            {preTitleLink && (
                <Link href={preTitleLink} 
                    className="text-slate-400 uppercase">
                    {preTitle}
                </Link>
            )}
            {!preTitleLink && (
                <h1 className="text-slate-400 uppercase">{preTitle}</h1>
            )}
            <h2 className="font-bold text-3xl mb-4 ">{mainTitle}</h2>
        </div>
    );
}