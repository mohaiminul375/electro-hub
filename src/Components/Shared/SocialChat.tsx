'use client'
import { WhatsAppWidget } from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";

const SocialChat = () => {
    return (
        <div className="">
            <WhatsAppWidget
                // CompanyIcon={logo}
                companyName='Electro-Hub'
                className='z-50'
                phoneNumber="+8801533057483" message={`Hi, How can I help you?`} />
        </div>
    );
};

export default SocialChat;