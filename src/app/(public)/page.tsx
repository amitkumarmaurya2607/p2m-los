import Home from "@/views/Home/Home";

const page = () => {
  // const lat = 28.5162668; // Replace with your lat
  // const lon = 77.0705353; // Replace with your lon

  // async function getOSMAddress() {
  //   try {
  //     const response = await fetch(
  //       `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
  //       {
  //         headers: {
  //           // CRITICAL: Replace this with your actual app name or email
  //           "User-Agent": "MyTravelApp/1.0 (contact@mywebsite.com)",
  //         },
  //       },
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();

  //     // OpenStreetMap returns the clean address string in "display_name"
  //     console.log("OSM Address:", data.display_name);
  //   } catch (error) {
  //     console.error("Error fetching address from OSM:", error);
  //   }
  // }

  // getOSMAddress();

  return (
    <div>
      <Home />
    </div>
  );
};

export default page;
