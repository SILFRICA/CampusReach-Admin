import React from 'react';
import BubblyClouds from '@/assets/Wavy Buddies Clouds.png';

const InsightsPage: React.FC = () => {
  return (
    <section className='p-6'>
        <header className='flex justify-between'>
            <h4 className="font-semibold text-xl text-black">
                Insights
            </h4>
            <a href="mailto:support@silfrica.com" className='w-[205px] h-[36px] bg-[#FFB13C] text-white flex justify-center items-center'>Contact us</a>
        </header>
        <br />
        <figure className='flex justify-center animate-pulse'>
            <img src={BubblyClouds} alt="image" className='w-52 md:w-auto'/>
        </figure>
        <br />
        <div className='flex justify-center h-[80px]'>
        <p className='max-w-[900px] px-3 text-black font-light text-base xl:text-xl text-center text-pretty'>We are working on an AI powered weekly report of the key happenings on your communication platform with recommendations for actions to be taken to improve speed, reliability and tackle major needs of all stakeholders.</p>
        </div>
    </section>
  )
}

export default InsightsPage
