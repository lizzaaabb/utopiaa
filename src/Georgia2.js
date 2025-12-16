import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Styles/ReGeorgia.css'
// Import your icon images
import icon1 from './Pictures/rre1.png'; // Replace with your actual icon paths
import icon2 from './Pictures/rre2.png'; // Replace with your actual icon paths
import icon3 from './Pictures/rre3.png'; // Replace with your actual icon paths
import icon4 from './Pictures/rre4.png'; // Replace with your actual icon paths
import icon5 from './Pictures/rre5.png'; // Replace with your actual icon paths
import icon6 from './Pictures/rre6.png'; // Replace with your actual icon paths

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function ReGeorgia() {
    const benefitIcons = [icon1, icon2, icon3, icon4, icon5, icon6];
    const benefitCardsRef = useRef([]);
    const titleRef = useRef(null);
    const containerRef = useRef(null);
    const componentId = useRef(`re-georgia-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
    const scrollTriggersRef = useRef([]);
    const gsapContextRef = useRef(null);
    const hoverAnimationsRef = useRef([]);

    const [currentLanguage, setCurrentLanguage] = useState(() => {
        return localStorage.getItem('selectedLanguage') || 'ara';
    });
            
    // Listen for changes in localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            const savedLanguage = localStorage.getItem('selectedLanguage');
            if (savedLanguage) {
                setCurrentLanguage(savedLanguage);
            }
        };
                
        // Listen for storage events (when localStorage changes in other components)
        window.addEventListener('storage', handleStorageChange);
                
        // Also check periodically in case the storage event doesn't fire
        const interval = setInterval(() => {
            const savedLanguage = localStorage.getItem('selectedLanguage');
            if (savedLanguage && savedLanguage !== currentLanguage) {
                setCurrentLanguage(savedLanguage);
            }
        }, 100);
                
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, [currentLanguage]);

    // Cleanup function to properly clean up all animations
    const cleanupAnimations = () => {
        // Kill only our ScrollTriggers
        scrollTriggersRef.current.forEach(trigger => {
            if (trigger && !trigger.isKilled) {
                trigger.kill();
            }
        });
        scrollTriggersRef.current = [];

        // Clean up hover animations
        hoverAnimationsRef.current.forEach(({ element, tween, enterHandler, leaveHandler }) => {
            if (element) {
                element.removeEventListener('mouseenter', enterHandler);
                element.removeEventListener('mouseleave', leaveHandler);
            }
            if (tween && !tween.isKilled) {
                tween.kill();
            }
        });
        hoverAnimationsRef.current = [];

        // Kill gsap context
        if (gsapContextRef.current) {
            gsapContextRef.current.revert();
            gsapContextRef.current = null;
        }
    };

    // GSAP Animations with improved conflict handling
    useEffect(() => {
        // Clean up previous animations first
        cleanupAnimations();

        // Create GSAP context for proper cleanup
        gsapContextRef.current = gsap.context(() => {
            // Title animation
            if (titleRef.current) {
                gsap.fromTo(titleRef.current, 
                    {
                        opacity: 0,
                        y: -30
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out"
                    }
                );
            }

            // Filter out null refs
            const validCards = benefitCardsRef.current.filter(card => card !== null);
            
            if (validCards.length > 0) {
                // Set initial state for all cards
                gsap.set(validCards, {
                    opacity: 0,
                    y: 50,
                    scale: 0.9
                });

                // Create a single timeline for all cards
                const cardTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: validCards[0].parentElement,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse",
                        id: `${componentId.current}-cards`,
                        refreshPriority: 1, // Higher priority
                        onRefresh: () => {
                            // Re-initialize if needed
                            console.log('ReGeorgia ScrollTrigger refreshed');
                        }
                    }
                });

                // Store the ScrollTrigger for cleanup
                scrollTriggersRef.current.push(cardTimeline.scrollTrigger);

                // Animate all cards with stagger
                cardTimeline.to(validCards, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.2)",
                    stagger: 0.1
                });

                // Add hover animations
                validCards.forEach((card, index) => {
                    const hoverTween = gsap.to(card, {
                        scale: 1.05,
                        y: -10,
                        duration: 0.3,
                        ease: "power2.out",
                        paused: true
                    });

                    const handleMouseEnter = () => hoverTween.play();
                    const handleMouseLeave = () => hoverTween.reverse();

                    card.addEventListener('mouseenter', handleMouseEnter);
                    card.addEventListener('mouseleave', handleMouseLeave);

                    // Store for cleanup
                    hoverAnimationsRef.current.push({
                        element: card,
                        tween: hoverTween,
                        enterHandler: handleMouseEnter,
                        leaveHandler: handleMouseLeave
                    });
                });
            }
        }, containerRef);

        // Set up a periodic check to recreate animations if they get destroyed
        const animationCheck = setInterval(() => {
            // Check if our ScrollTriggers are still alive
            const aliveScrollTriggers = scrollTriggersRef.current.filter(trigger => 
                trigger && !trigger.isKilled
            );
            
            // If all ScrollTriggers are dead but we still have elements, recreate them
            if (aliveScrollTriggers.length === 0 && 
                scrollTriggersRef.current.length > 0 && 
                benefitCardsRef.current.filter(card => card !== null).length > 0) {
                
                console.log('ReGeorgia animations were destroyed, recreating...');
                
                // Clean up and recreate
                setTimeout(() => {
                    if (containerRef.current) {
                        cleanupAnimations();
                        // Trigger useEffect again by updating a dummy state
                        setCurrentLanguage(prev => prev);
                    }
                }, 100);
            }
        }, 1000);

        // Cleanup function
        return () => {
            clearInterval(animationCheck);
            cleanupAnimations();
        };
    }, [currentLanguage]);

    const content = {
        eng: {
          title: "Benefits of Real Estate Investment in Georgia",
          benefits: [
            "Easy ownership for foreigners. Anyone can fully own property in their name — legally and securely.",
            "Attractive property prices. High-end apartments or villas can cost a fraction of what you would pay in Europe or the Gulf.",
            "Strong rental returns. With a booming tourism market, short-term rentals yield consistent income.",
            "High demand from tourists. Over 9 million visitors annually — perfect for investing in hotel-style apartments or tourist units.",
            "Residency through property ownership. Buying property above a certain value qualifies you for legal residency.",
            "Low taxes & supportive government. Georgia ranks among the easiest countries in the world for doing business."
          ]
        },
        geo: {
          title: "უძრავი ქონების ინვესტიციის უპირატესობები საქართველოში",
          benefits: [
            "ადვილი საკუთრების გაფორმება უცხოელებისთვის. ნებისმიერ უცხოელს შეუძლია სრულად და კანონიერად ფლობდეს ქონებას საქართველოში.",
            "მიმზიდველი ფასები. ბინა ან ვილა შეიძლება ღირდეს 3-4-ჯერ ნაკლები, ვიდრე ევროპაში ან GCC ქვეყნებში.",
            "მაღალი გაქირავების შემოსავალი. ტურისტული ნაკადი მზარდია და სეზონი გრძელდება თითქმის მთელი წელი.",
            "მუდმივი მოთხოვნა ტურისტული ქონებაზე. წელიწადში 9 მილიონზე მეტი ტურისტი სტუმრობს საქართველოს – ინვესტიცია სასტუმრო ბინებში ძალიან მომგებიანია.",
            "მუდმივი ბინადრობა ქონების მეშვეობით. განსაზღვრული ღირებულების ქონების შეძენის შემთხვევაში შესაძლებელია ბინადრობის ნებართვის მიღება.",
            "დაბალი გადასახადები და მთავრობის მხარდაჭერა. საქართველო აღიარებულია როგორც ერთ-ერთი საუკეთესო ქვეყანა ბიზნესის გამარტივებისთვის."
          ]
        },
        ara: {
          title: "مكاسب الاستثمار العقاري في جورجيا",
          benefits: [
            "سهولة التملك للأجانب. يمكن لأي أجنبي تملك عقار باسمه مباشرة، بدون شركاء محليين، وبتسجيل قانوني شفاف خلال أيام.",
            "أسعار تنافسية. يمكنك شراء شقة أو فيلا راقية بسعر يعادل ربع ما تدفعه في أوروبا أو الخليج.",
            "عوائد إيجارية ممتازة. جورجيا بلد سياحي ناشئ، وموسمها ممتد، مما يجعل تأجير العقارات مربحًا طوال العام.",
            "طلب مرتفع من السياح. أكثر من 9 ملايين سائح يزورون جورجيا سنويًا، مما يجعل الاستثمار في الشقق الفندقية أو الوحدات السياحية فرصة حقيقية.",
            "الإقامة عبر التملك. يمكن الحصول على إقامة قانونية عبر امتلاك عقار بقيمة معينة.",
            "ضرائب منخفضة وتشجيع حكومي. جورجيا تصنف ضمن الدول الأفضل عالميًا في سهولة ممارسة الأعمال."
          ]
        }
    };

    return (
        <div className='re-georgia-body' ref={containerRef}>
            {/* Benefits Section */}
            <div className="re-georgia-benefits">
                <h2 
                    className="re-georgia-benefits-title"
                    ref={titleRef}
                >
                    {content[currentLanguage].title}
                </h2>
                <div className="benefits-cards-container">
                    {content[currentLanguage].benefits.map((benefit, index) => (
                        <div 
                            key={index} 
                            className="benefit-card"
                            ref={el => benefitCardsRef.current[index] = el}
                        >
                            <div className="benefit-card-content">
                                <img 
                                    src={benefitIcons[index % benefitIcons.length]} 
                                    alt={`Benefit ${index + 1}`} 
                                    className="benefit-icon"
                                />
                                <p className="benefit-text">{benefit}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ReGeorgia