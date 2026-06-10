import Timer from "../Timer";

type QrCodeProps = {
  qrcode: string;
  timeover: () => void;
  upiUrl?: string;
};

const QrCode = ({ qrcode, upiUrl, timeover = () => {} }: QrCodeProps) => {
  return (
    <div className="mt-10 flex justify-center max-[992px]:flex-col max-[992px]:items-center">
      {/* Left Box */}
      <div
        className="w-full max-w-[300px] px-[30px] py-5 font-['Poppins',sans-serif]
          max-[992px]:px-[30px]"
      >
        <h2 className="mb-2.5 hidden text-center text-[28px] font-semibold max-[992px]:block">
          Pay with QR
        </h2>

        <h3
          className="mb-[25px] hidden text-center text-[20px] font-medium leading-[30px]
            max-[992px]:block"
        >
          Scan QR code to make <br /> a payment.
        </h3>

        <div
          className="relative w-full max-w-[280px] gap-2.5 rounded-[10px] border border-[#EAEAEA]
            bg-white px-2.5 pt-2.5 pb-5 shadow-[0px_1px_2px_#0000000D]"
        >
          <img
            src={`data:image/png;base64,${qrcode}`}
            alt="pay with qr"
            className="aspect-square w-full"
          />

          <div className="absolute bottom-[9px] left-1/2 -translate-x-1/2 text-[13px]">
            <Timer setTimeover={timeover} />
          </div>
        </div>
      </div>

      {/* Middle Divider */}
      <div className="border-l border-dashed border-[#1E437A] max-[992px]:hidden" />

      {/* Right Box */}
      <div className="max-w-[300px] px-[30px] py-5 text-center font-['Poppins',sans-serif]">
        <h2 className="mb-2.5 text-[28px] font-semibold max-[992px]:hidden">Pay with QR</h2>

        <h3 className="mb-[25px] text-[20px] font-medium leading-[30px] max-[992px]:hidden">
          Scan QR code to make <br /> a payment.
        </h3>

        <p className="mb-3 text-[13px] font-medium leading-5 max-[992px]:mt-2.5">
          Pay with any Payment App
        </p>

        <img src="\images\paymentsImages.svg" alt="icons" className="mx-auto" />

        <a
          href={upiUrl}
          className="mt-5 block w-full rounded-md border border-[#1E437A] px-5 py-2 text-center
            text-sm font-medium text-[#1E437A] transition hover:bg-[#1E437A] hover:text-white"
        >
          Pay With UPI
        </a>
      </div>
    </div>
  );
};

export default QrCode;
