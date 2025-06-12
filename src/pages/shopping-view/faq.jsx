import { Accordion } from "./accordians";


export const Faq = () => {
    const faqs = [
        {
            "id": 1,
            "question": "What payment methods do you accept?",
            "answer": "We accept major credit cards, debit cards, UPI, and net banking for your convenience."
        },
        {
            "id": 2,
            "question": "CHow long does delivery take?",
            "answer": " Standard delivery takes 3-5 business days. Express delivery is available for select products"
        },
        {
            "id": 3,
            "question": " What is your return policy?",
            "answer": "We accept returns within 7 days of delivery. Products must be in original condition with all tags."
        },
        {
            "id": 4,
            "question": "Are your products high-quality?",
            "answer": "Yes, we source only premium-quality products from trusted suppliers to ensure you get the best value for your money."
        }
    ];


    return (
        <section className="my-10 p-7 border rounded shadow-sm bg-white text-black">
            <h1 className="text-2xl text-center font-semibold mb-3 underline underline-offset-8">
                Question in mind?
            </h1>
            <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white text-black" data-inactive-classes="text-gray-500">
                {faqs.map((faq) => (
                    <Accordion key={faq.id} faq={faq} />
                ))}
            </div>
        </section>

    )
}
