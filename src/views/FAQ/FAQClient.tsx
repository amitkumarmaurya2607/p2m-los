"use client";

import React, { useState, useMemo } from "react";
import { Search, Plus, Minus, X } from "lucide-react";
import TextInput from "@/components/ui/TextInput";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const HighlightedText = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark key={i} className="bg-primary/20 text-primary rounded-sm px-0.5 font-bold">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
};

const AccordionItem = ({
  item,
  isOpen,
  highlight,
  onClick,
}: {
  item: FAQItem;
  isOpen: boolean;
  highlight: string;
  onClick: () => void;
}) => {
  return (
    <div
      className={`border border-border rounded-2xl overflow-hidden transition-all duration-300
        ${isOpen ? "bg-surface shadow-md border-primary/20" : "bg-surface-muted hover:border-primary/30"}`}
    >
      <button
        onClick={onClick}
        className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
      >
        <span
          className={`font-bold text-lg leading-tight tracking-tight
            ${isOpen ? "text-primary" : "text-text-heading"}`}
        >
          <HighlightedText text={item.question} highlight={highlight} />
        </span>
        <div
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all
            duration-300
            ${isOpen ? "bg-primary text-white rotate-180" : "bg-primary/10 text-primary"}`}
        >
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div
          className="px-6 pb-6 text-text-secondary leading-relaxed border-t border-border/50 pt-4"
        >
          {item.answer}
        </div>
      </div>
    </div>
  );
};

export default function FAQClient({ faqData }: { faqData: FAQItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openId, setOpenId] = useState<string | null>(faqData[0]?.id || null);

  const dynamicCategories = useMemo(() => {
    const cats = new Set(faqData.map((item) => item.category));
    return ["All", ...Array.from(cats)];
  }, [faqData]);

  const filteredFAQs = useMemo(() => {
    const results = faqData.filter((item) => {
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    if (searchQuery.length > 2 && results.length > 0) {
      setOpenId(results[0].id);
    }

    return results;
  }, [searchQuery, activeCategory, faqData]);

  return (
    <>
      <div className="max-w-2xl mx-auto relative group -mt-24 mb-20 z-20">
        <TextInput
          placeholder="Search e.g. 'CIBIL', 'Repayment'..."
          leftIcon={
            <Search className="group-focus-within:text-primary transition-colors" size={20} />
          }
          rightIcon={
            searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-2 hover:bg-black/5 rounded-full mr-2"
              >
                <X size={16} />
              </button>
            )
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="!h-[72px] !rounded-full !px-8 text-lg shadow-xl"
        />
      </div>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {dynamicCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all border ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105"
                    : `bg-surface border-border text-text-secondary hover:border-primary/40
                      hover:text-primary`
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {searchQuery && (
            <div className="max-w-4xl mx-auto mb-6 text-text-muted font-medium px-4">
              Found {filteredFAQs.length} results for "{searchQuery}"
            </div>
          )}

          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <AccordionItem
                    item={faq}
                    isOpen={openId === faq.id}
                    highlight={searchQuery}
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  />
                </div>
              ))
            ) : (
              <div
                className="text-center py-20 bg-surface-muted rounded-[32px] border-2 border-dashed
                  border-border"
              >
                <Search size={48} className="text-text-muted mx-auto mb-4 opacity-20" />
                <h3 className="text-xl font-bold text-text-heading mb-2">No results found</h3>
                <p className="text-text-secondary mb-6">
                  We couldn't find any questions matching your search.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="text-primary font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
