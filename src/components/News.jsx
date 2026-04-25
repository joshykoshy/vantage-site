import { motion } from 'framer-motion';
import { Newspaper, Trophy, Users } from 'lucide-react';

const NewsCard = ({ icon: Icon, title, source, date }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-vantage-charcoal/50 border border-white/5 p-6 rounded-xl hover:bg-white/5 transition-all cursor-pointer group"
    >
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-vantage-electric/10 rounded-lg text-vantage-electric group-hover:bg-vantage-electric group-hover:text-white transition-colors">
                <Icon size={24} />
            </div>
            <span className="text-xs text-vantage-grey">{date}</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-vantage-electric transition-colors">{title}</h3>
        <p className="text-sm text-vantage-grey uppercase tracking-wider">{source}</p>
    </motion.div>
);

const News = () => {
    return (
        <section className="py-24 bg-vantage-navy border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Latest Updates</h2>
                        <p className="text-vantage-grey">Milestones on our journey.</p>
                    </div>
                    <button className="hidden md:block text-vantage-electric hover:text-white transition-colors font-medium">View Archive</button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <NewsCard
                        icon={Trophy}
                        title="Innovation Fair Runner-Up"
                        source="UOWD Innovation Fair"
                        date="Nov 2024"
                    />
                    <NewsCard
                        icon={Newspaper}
                        title="Featured: Homegrown Innovation"
                        source="Khaleej Times"
                        date="Oct 2024"
                    />
                    <NewsCard
                        icon={Users}
                        title="Pilot Program Launch"
                        source="Al Noor Centre"
                        date="Sep 2024"
                    />
                </div>
            </div>
        </section>
    );
};

export default News;
