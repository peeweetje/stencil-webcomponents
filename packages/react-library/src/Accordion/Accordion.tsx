import React, { useState } from 'react';
import './Accordion.scss';

export interface AccordionItem {
    header: string;
    content: string;
}

export interface AccordionProps {
    items?: AccordionItem[] | string;
    allowMultiple?: boolean;
    className?: string;
}

const Accordion: React.FC<AccordionProps> = ({
    items = [],
    allowMultiple = false,
    className
}) => {
    const [openSections, setOpenSections] = useState<number[]>([]);

    const parsedItems: AccordionItem[] = React.useMemo(() => {
        if (typeof items === 'string') {
            try {
                return JSON.parse(items);
            } catch {
                return [];
            }
        }
        return items || [];
    }, [items]);

    const toggleSection = (index: number) => {
        const isOpen = openSections.includes(index);

        if (allowMultiple) {
            if (isOpen) {
                setOpenSections(prev => prev.filter(i => i !== index));
            } else {
                setOpenSections(prev => [...prev, index]);
            }
        } else {
            if (isOpen) {
                setOpenSections([]);
            } else {
                setOpenSections([index]);
            }
        }
    };

    return (
        <div className={`accordion ${className || ''}`}>
            {parsedItems.map((item, index) => {
                const isOpen = openSections.includes(index);
                return (
                    <div className={`accordion-item ${isOpen ? 'is-open' : ''}`} key={index}>
                        <button
                            className="accordion-header"
                            onClick={() => toggleSection(index)}
                            aria-expanded={isOpen ? 'true' : 'false'}
                        >
                            <span className="header-text">{item.header}</span>
                            <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
                        </button>
                        <div
                            className={`accordion-content ${isOpen ? 'visible' : ''}`}
                            hidden={!isOpen}
                            role="region"
                        >
                            <div className="content-inner">{item.content}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Accordion;
