const PartnerLogo = ({ name }) => (
    <div className="h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-50 hover:opacity-100">
        <span className="text-xl font-bold text-white font-mono border border-white/20 px-6 py-3 rounded-full">{name}</span>
    </div>
);

const Impact = () => {
    return (
        <section className="py-24 bg-vantage-charcoal border-t border-white/5">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm font-mono text-vantage-silver/50 mb-12 uppercase tracking-widest">Co-created with Leaders</p>

                <div className="flex flex-wrap justify-center gap-12 md:gap-24 mb-24">
                    <PartnerLogo name="ZHO" />
                    <PartnerLogo name="AL NOOR" />
                    <PartnerLogo name="EXPO CITY DUBAI FOUNDATION" />
                </div>

                <div className="max-w-4xl mx-auto border-t border-white/5 pt-16">
                    <p className="text-2xl md:text-3xl font-light text-white italic leading-relaxed mb-8">
                        "Vantage isn't just a tool; it's a sensory extension. The precision of the haptics feels like a natural sense."
                    </p>
                    <div className="flex justify-center items-center gap-4">
                        <div className="h-px w-12 bg-vantage-silver/50"></div>
                        <span className="text-sm text-vantage-grey font-mono uppercase">Pilot User — Dubai</span>
                        <div className="h-px w-12 bg-vantage-silver/50"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Impact;
