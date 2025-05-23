import DefaultLayout from "@/layout/DefaultLayout";

export default function Blog() {
    // Sample blog posts data
    const blogPosts = [
        {
            title: "Understanding Digital Payments",
            date: "April 1, 2025",
            summary: "A deep dive into the world of digital payments and their impact on global commerce.",
        },
        {
            title: "The Future of Cryptocurrency",
            date: "April 15, 2025",
            summary: "Exploring the potential of cryptocurrency in the next decade.",
        },
        {
            title: "How to Secure Your Online Transactions",
            date: "April 20, 2025",
            summary: "Tips and tricks to ensure your online transactions are safe and secure.",
        },
        {
            title: "The Rise of Mobile Payments",
            date: "April 25, 2025",
            summary: "An overview of the growing trend of mobile payments and their advantages.",
        },
    ];

    // Function to render each blog post
    const renderBlogPost = (post: { title: string; date: string; summary: string }) => {
        return (
            <div className="border border-gray-700 rounded-lg p-6 hover:border-green-500 transition">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-400 text-sm mb-4">{post.date} • 5 min read</p>
                <p className="text-gray-300">{post.summary}</p>
                <a href="#" className="text-green-400 mt-4 inline-block">Read More →</a>
            </div>
        );
    };

    return (
        <div className="bg-gray-900 rounded-lg">
            <DefaultLayout>
                <main className="max-w-7xl mx-auto py-36 px-4 text-white">
                    <h1 className="text-4xl font-bold text-green-400 mb-6">MigelPay Blog</h1>
                    <p className="text-gray-300 mb-8">Latest news, updates, and insights in the world of digital payments.</p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {blogPosts.map((post, index) => (
                            <div key={index} className="bg-cyan-900 rounded-lg p-6 hover:bg-gray-700 transition">
                                {renderBlogPost(post)}
                            </div>
                        ))}
                    </div>
                </main>
            </DefaultLayout>
        </div>
    );
}
