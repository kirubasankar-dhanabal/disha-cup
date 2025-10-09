import Counter from "./helper/Counter";
import { usePayment } from "./context/PaymentContext";
import { useEffect } from "react";

const Dashboard = () => {

  const { cartDetails, setCartDetails } = usePayment();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-6">
      <div className="">
        <div className="md:flex-shrink-0 p-6">
          <img className='mx-auto' src="https://files.nithra.mobi/nithra-calendar/Tamil-calendar/notification/2026_calendar.webp" alt="2026 நித்ரா மாத காலண்டர்" />
        </div>
        <hr class="border-t border-gray-300 my-4" />
        <div className='p-4 rounded-xl bg-firstCard text-fCTextColor font-semibold text-gray-900 border'>
          2026 நித்ரா தமிழ் காலண்டர் 5 - 6 நாட்களில் டெலிவரி செய்யப்படும்.
        </div>
        <p className='font-semibold text-gray-900 p-4'>தேர்ந்தெடுத்த அளவுக்கு விலை (மொத்தம்) • சராசரி பீஸ் விலை: ₹75</p>
        <div className='flex items-center'>
          <span className='p-4'>Qty</span>
          <Counter />
        </div>
        <div className='p-4 rounded-xl bg-secondCard text-sCTextColor font-semibold text-gray-900 border'>
          மொத்தம்: ₹{cartDetails.total}
        </div>
        <p className='font-semibold text-gray-900 p-4 text-darkviolet'>
          சாமி படங்களுடன் கூடிய 2026 நித்ரா மாத காலண்டர் இன்னும் சற்று பெரிய அளவில்..
        </p>
        <p className='ftext-[#ff1493] p-4'>
          சட்டென்று திரும்பி தேதி பார்க்க ஹாலில்...
        </p>
        <p className='text-[#9400d3] p-4'>
          கேஸ் மாற்றிய தேதி முதல் பால் வாங்கிய நாள் வரை வட்டமிட்டு குறித்து வைக்க சமையலறையில்!
        </p>
        <p className='text-[#006400] p-4'>
          காலை எழுந்தவுடன் கடவுளை பார்த்திட பெட்ரூமில்... என வீடெங்கும் ஏதாவது ஒரு தேவைக்கு நாம் தேடுவது மாத காலண்டர் மட்டுமே!
        </p>
        <p className='text-[#008080] p-4'>
          வீட்டிற்கு ஒரு சிறந்த திட்டமிடும் கருவியாக செயல்படும் மாத காலண்டரை இப்போதே வாங்கிடுங்கள்!
        </p>
        <p className='text-[#ff1493] p-4'>
          வீட்டிற்கு வந்த விருந்தினர்களை வெறும் கையோடு அனுப்பாமல், நித்ரா மாத காலண்டர் 2026-ஐ கொடுத்து வழியனுப்புங்கள்.
        </p>
        <p className='text-[#9400d3] p-4'>
          உங்களிடம் வேலை செய்யும் பணியாளர்களுக்கு அன்பளிப்பாக வழங்குங்கள்.
        </p>
        <hr class="border-t border-gray-300 my-4" />
        <p className='font-semibold text-[#5b3700] p-4'>
          குறிப்பு
        </p>
        <div className='p-4 rounded-xl bg-secondCard text-sCTextColor text-[#4a2d00] border-2'>
          <p className='p-3'>20+ மேற்பட்ட காலண்டர்கள் ஆர்டர் செய்ய <b>9994474761</b> என்ற எண்ணிற்கு WhatsApp செய்யவும். அல்லது நித்ரா தமிழ் காலண்டரின் Toll Free <b>0444-63-111-55</b> எண்ணிற்கு அழைக்கவும்.</p>
          <p className='p-3'>காலண்டர் 5 - 6 நாட்களுக்குள் உங்களுக்கு டெலிவரி செய்யப்படும்.</p>
          <p className='p-3'>டெலிவரி முடிந்த பிறகு, காலண்டர் திரும்பப் பெறப்படாது. அதற்கான பணமும் திரும்பக் கொடுக்கப்படாது.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;