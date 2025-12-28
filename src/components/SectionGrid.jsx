import React, { useRef } from 'react';
import Card from './Card';

const SectionGrid = ({ title, items, roundImage = false, showAllLink = false, onRemove }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="mb-8 px-4 md:px-12 relative group">
            <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-xl md:text-2xl font-bold text-white hover:underline cursor-pointer tracking-tight">
                    {title}
                </h2>

                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white transition-all disabled:opacity-30"
                    >
                        <i className="fa fa-chevron-left text-sm"></i>
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                    >
                        <i className="fa fa-chevron-right text-sm"></i>
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.map((item, index) => (
                    <div key={index} className="min-w-[160px] md:min-w-[200px] snap-start">
                        <Card
                            image={item.image}
                            title={item.title}
                            subtitle={item.subtitle}
                            previewUrl={item.previewUrl}
                            queue={items}
                            roundImage={roundImage}
                            onRemove={onRemove}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SectionGrid;
