import React from 'react'
import styles from './Parallax.module.css';
import Divide from './Divide';
const Sections = () => {
    return (
        <div >
            <section className={`${styles.section} ${styles.section1}  h-screen`}>
                <div className={`${styles.mypadding}`}>
                <img src="/img/Dajin.png" className={`${styles.image} `} />
                <p className={styles.firstp}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <img src="/img/chick.png" className={styles.chickimg}/>
                <img src="/img/img_group25.png" className={styles.image2} />
                </div>
                <h1 className={`${styles.heading} ${styles.heading1}`}>داجن </h1>
            </section>
            
            <header className='h-screen items-center justify-center text-center bg-myYellow'>
                <h1 className='text-8xl text-center  p-4 text-white font-bauziet font-extrabold pt-60'>Title</h1>
            </header>

            <section className= 'h-3/4'>
                <Divide/>
            </section>
            <header className='h-screen items-center justify-center text-center bg-myYellow'>
                <h1 className='text-8xl text-center  p-4 text-white font-bauziet font-extrabold pt-60'>Title</h1>
            </header>

            
            <section className={`${styles.section} ${styles.section4}`}>
                <div className="md:flex ml-3 flex-col  lg:grid grid-cols-3 gap-6 m-4  pt-5 ">
                    <div className={styles.cards}>
                        <div className="flex items-center space-x-3 mb-2">
                            <img src="/img/values.png" alt="" className="w-8 h-8" />
                            <h2 className="text-xl font-semibold">Card title!</h2>
                        </div>
                        <img src="/img/quote.png" className='w-8 h-8'  />

                        <p className=" md:text-0.5xl  lg:text-2xl ml-4 text-right leading-8 sm:leading-10">
                            الابتكار: نسعى باستمرار للابتكار والإبداع لتحسين 
                            وتطوير خدماتنا وحلولنا
                            <br/>
                            الاستدامة: نحن ملتزمون بتعزيز الممارسات الزراعية المستدامة والمسؤولة التي تعود بالنفع على المستثمرين والبيئة
                            <br/> 
                            النزاهة: نعمل بأمانة وشفافية ومساءلة في كل ما نقوم به
                            <br/> 
                            التركيز على العملاء: نضع عملائنا في قلب أعمالنا ونسعى جاهدين لتلبية احتياجاتهم وتجاوز توقعاتهم
                            <br/> 
                            التعاون: نحن نقدر التعاون والشراكة مع أصحاب المصلحة عبر
                        </p>

                        <div className="flex justify-end">
                            <img src="/img/quote.png" className="w-8 h-8" />
                        </div>
                    </div>

                    <div className={styles.cards}>
                        <div className="flex items-center space-x-3 mb-2">
                            <img src="/img/tasks.png" alt="" className="w-8 h-8" />
                            <h2 className="text-xl font-semibold">Card title!</h2>
                        </div>
                    
                        <img src="/img/quote.png" className='w-10 h-10'  />
                        <p className='text-4xl mt-3 ml-2 text-right'>تمكين ودعم وتحسين سبل عيش العاملين في صناعة الدواجن من خلال حلول مالية وتقنية مبتكرة، مع المساهمة في النمو الاقتصادي المستدام والمسؤول، الذي يتماشى مع أهداف التنمية المستدامة.</p>
                        <div className="flex justify-end">
                            <img src="/img/quote.png" className="w-10 h-10" />
                        </div>
                    </div>

                    <div className={styles.cards}>
                        <div className="flex items-center space-x-3 mb-2">
                            <img src="/img/summit.png" alt="" className="w-8 h-8" />
                            <h2 className="text-xl font-semibold">Card title!</h2>
                        </div>
                    
                        <img src="/img/quote.png" className='w-10 h-10'  />
                        <p className='text-2xl mt-3 ml-1 text-right leading-10'>
                            الاستفادة من الحلول التقنية المبتكرة، مثل الذكاء الاصطناعي وتحليلات البيانات، لتحسين العمليات وتقليل الفاقد
                            <br/>
                        </p>

                        <p className='text-2xl mt-3 ml-1 text-right leading-10'>
                            المساهمة في تحقيق أهداف التنمية المستدامة، ولا سيما أهداف التنمية المستدامة رقم 1 و 2 و 5 و 8 و 13، من خلال
                        </p>
                        <div className="flex justify-end">
                            <img src="/img/quote.png" className="w-10 h-10" />
                        </div>
                    </div>
                </div>
                    
            </section>

            <section className={`${styles.section} ${styles.section5}`}>
    <h1 className={styles.subtitle}>Our Services</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-4 pt-5 pb-10">
        
        <div className={`${styles.cards2} ${styles.service1} relative`}>
            <div className=" mb-2 text-right">
                <h2 className="text-xl font-semibold">السوق</h2>
            </div>
            <div className='grid grid-cols-2'>
                <div>
                    <div className="relative flex  lg:mt-0">
                        <img src="/img/Dajin.png" className="md: w-40 lg:w-96 -mt-10 h-[57vh] z-10 -ml-6" />
                        <img src="/img/market.png" className=' h-60 -ml-64 z-20 mt-32' alt="" />
                        <img src="/img/hen.png" className="md:  lg:mt-40 h-52 w-46 -ml-20 z-20" />
                    </div>
                </div>

                <div>
                    <p className="text-lg text-right font-sans z-30 relative text-white "> 
                    يوفر لك سوق داچن الإليكتروني الوصول الى بيع / شراء منتجاتك / مدخلاتك بأسهل الوسائل المصممة خصيصاً لسوق الدواجن معتوفير قاعدة أوسع للمعروض, تغطية أكبر للمناطق الجغرافية وقيمة أفضل في مقابل السعر مراعين في ذلك طبيعة السوق الخاصةبكل تفاصيلها – أسواقنا متخصصة مصممة وفقاً لطبيعة كل مرحلةمن أول الخامات لمدخلات الإنتاج مروراً بسوق الدواجن الحية وصولاً الى سوق الدواجن المذبوحة ومجزءاتها.         
                    </p>
                        </div>
            </div>
            
            

        </div>

        {/* Repeat the structure for other service cards */}
        <div className={`${styles.cards2} ${styles.service2}`}>
            <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-xl font-semibold">Card title!</h2>
            </div>
        </div>

        <div className={`${styles.cards2} ${styles.service3}`}>
            <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-xl font-semibold">Card title!</h2>
            </div>
        </div>

        <div className={`${styles.cards2} ${styles.service4}`}>
            <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-xl font-semibold">Card title!</h2>
            </div>
        </div>

    </div>     
</section>


            

        </div>
    )
}

export default Sections
