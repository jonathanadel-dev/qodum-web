// Imports
import {useEffect} from 'react';





// Main function
const PaymentButton = ({accessKey, publicKey, setPaymentResponse}) => {

    // Handle payment
    const handlePayment = () => {

      // @ts-ignore
      if (!window.easebuzzCheckout) {
        console.error('EasebuzzCheckout is not loaded yet.');
        return;
      };

      const options = {
        access_key:accessKey,
        onResponse:(response:any) => {
          setPaymentResponse(response);
        },
        theme:'#foo',
      };

      // @ts-ignore
      window.easebuzzCheckout.initiatePayment(options);

    };


    // Use effect
    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/v2.0.0/easebuzz-checkout-v2.min.js';
      script.async = true;
      script.onload = () => {
        // @ts-ignore
        window.easebuzzCheckout = new window.EasebuzzCheckout(publicKey, 'test');
        // window.easebuzzCheckout = new window.EasebuzzCheckout(publicKey, 'prod');
      };
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      };
    }, [publicKey]);

  return (
    <span
      // id='ebz-checkout-btn'
      onClick={handlePayment}
      className='text-xs px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'
    >
      Proceed to Pay
    </span>
  );
};





// Export
export default PaymentButton;