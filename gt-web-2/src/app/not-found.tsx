import "@/app/(web)/globals.css";
import PageNotFound from "@/components/core/PageNotFound/PageNotFound";

export default function NotFoundPage() {
    return (
        <section style={{ background: "#F7F5F2", height: "100vh" }}>
            <PageNotFound />
        </section>
    )
}