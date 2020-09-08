import Link from "next/link";
import fs from "fs";
import { useEffect } from "react";

const Home = ({ slugs }) => {
    useEffect(() => {
        // @ts-ignore
        if (window.netlifyIdentity) {
            // @ts-ignore
            window.netlifyIdentity.on("init", (user) => {
                if (!user) {
                    // @ts-ignore
                    window.netlifyIdentity.on("login", () => {
                        document.location.href = "/admin/";
                    });
                }
            });
        }
    }, []);
    return (
        <>
            <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
            <div>
                slugs:
                {slugs.map((slug) => {
                    return (
                        <div key={slug}>
                            <Link href={"/blog/" + slug}>
                                <a>{"/blog/" + slug}</a>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export const getStaticProps = async () => {
    const files = fs.readdirSync("posts");
    return {
        props: {
            slugs: files.map((filename) => filename.replace(".md", "")),
        },
    };
};

export default Home;
