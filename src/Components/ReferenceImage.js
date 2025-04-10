import React from "react";
import "@aws-amplify/ui-react/styles.css";
import Header from "./Header";
import { Alert, Image, useTheme, Button } from "@aws-amplify/ui-react";

function ReferenceImage({ faceLivenessAnalysis, tryagain }) {
  const { tokens } = useTheme();
  return (
    <>
      <h1>pic</h1>
      <Alert
        variation="info"
        isDismissible={false}
        hasIcon={false}
        marginTop={tokens.space.large}
      >
        Session ID: {faceLivenessAnalysis.SessionId}
      </Alert>
      <Header />
      <Alert variation="info" isDismissible={false} hasIcon={false}>
        Status: {faceLivenessAnalysis.Status}
      </Alert>
      <Alert variation="info" isDismissible={false} hasIcon={false}>
        Confidence Score: {faceLivenessAnalysis.Confidence.toFixed(2)}%
      </Alert>

      <Button
        variation="primary"
        type="submit"
        marginTop={tokens.space.large}
        marginBottom={tokens.space.large}
        onClick={tryagain}
      >
        Try Again
      </Button>

      <Button
        variation="primary"
        type="submit"
        marginTop={tokens.space.large}
        marginBottom={tokens.space.large}
        onClick={tryagain}
      >
        Try Again
      </Button>
      <Image
        src={
          "data:image/jpeg;base64," + faceLivenessAnalysis.ReferenceImage.Bytes
        }
        width="100%"
        height="100%"
        objectFit="cover"
        objectPosition="50% 50%"
      />
    </>
  );
}

export default ReferenceImage;

// import React from "react";
// import "@aws-amplify/ui-react/styles.css";

// import { Alert, Image, useTheme, Button } from "@aws-amplify/ui-react";

// import axios from "axios"; // To handle API requests

// function ReferenceImage({ faceLivenessAnalysis, tryagain }) {
//   const { tokens } = useTheme();

//   // Function to send the image to the API
//   const sendToAPI = async () => {
//     const apiEndpoint = "https://vfseu.mioot.com/forms/UAT/PhotoVerify/Test/"; // Replace with your API URL
//     const apiToken = "YOUR_API_TOKEN"; // Replace with your API token (if required)

//     // Base64 image string
//     const imageBase64 =
//       "data:image/jpeg;base64," + faceLivenessAnalysis.ReferenceImage.Bytes;

//     try {
//       const response = await axios.post(
//         apiEndpoint,
//         { image: imageBase64 }, // Payload to send to the backend
//         { headers: { Authorization: `Bearer ${apiToken}` } } // Add headers if needed
//       );
//       console.log("Image sent to API successfully:", response.data);
//       alert("Image successfully sent to the API!");
//     } catch (error) {
//       console.error("Error sending image to API:", error);
//       alert("Failed to send image to the API.");
//     }
//   };

//   return (
//     <>
//       <Alert
//         variation="info"
//         isDismissible={false}
//         hasIcon={false}
//         marginTop={tokens.space.large}
//       >
//         Session ID: {faceLivenessAnalysis.SessionId}
//       </Alert>
//       <Alert variation="info" isDismissible={false} hasIcon={false}>
//         Status: {faceLivenessAnalysis.Status}
//       </Alert>
//       <Alert variation="info" isDismissible={false} hasIcon={false}>
//         Confidence Score: {faceLivenessAnalysis.Confidence.toFixed(2)}%
//       </Alert>

//       <Button
//         variation="primary"
//         type="submit"
//         marginTop={tokens.space.large}
//         marginBottom={tokens.space.large}
//         onClick={tryagain}
//       >
//         Try Again
//       </Button>

//       <Button
//         variation="primary"
//         type="submit"
//         marginTop={tokens.space.large}
//         marginBottom={tokens.space.large}
//         onClick={sendToAPI}
//       >
//         Send to API
//       </Button>

//       <Image
//         src={
//           "data:image/jpeg;base64," + faceLivenessAnalysis.ReferenceImage.Bytes
//         }
//         width="100%"
//         height="100%"
//         objectFit="cover"
//         objectPosition="50% 50%"
//       />
//     </>
//   );
// }

// export default ReferenceImage;
// import React from "react";
// import "@aws-amplify/ui-react/styles.css";

// import { Alert, Image, useTheme, Button } from "@aws-amplify/ui-react";
// import axios from "axios"; // For making HTTP requests

// function ReferenceImage({ faceLivenessAnalysis, tryagain }) {
//   const { tokens } = useTheme();

//   // ✅ Send the image to the backend API
//   const sendToAPI = async () => {
//     const apiEndpoint = "https://vfseu.mioot.com/forms/UAT/PhotoVerify/Test/";

//     // Base64 image with header
//     const imageBase64 =
//       "data:image/jpeg;base64," + faceLivenessAnalysis.ReferenceImage.Bytes;

//     try {
//       const response = await axios.post(
//         apiEndpoint,
//         {
//           image: imageBase64, // ✅ Confirm this key name with your API provider
//           sessionId: faceLivenessAnalysis.SessionId,
//           confidence: faceLivenessAnalysis.Confidence,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             // "Authorization": "Bearer YOUR_API_TOKEN" // Uncomment if API needs auth
//           },
//         }
//       );

//       console.log("✅ Image sent to API successfully:", response.data);
//       if (response.data.statusCode == 200) {
//         if (response.data.body.Status == "SUCCEEDED") {
//           const response = await fetch(
//             "https://vfseu.mioot.com/forms/UAT/PhotoVerify/api/uploadImages/uploadCapture.php",
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: {
//                 session_id: session_id,
//                 session_token: session_token,
//                 image: response.data.body.ReferenceImage.Bytes,
//               },
//             }
//           );
//           const data = await response.json();
//           if ((data.status = 1)) {
//           } else {
//           }
//         }
//       }

//       alert("✅ Image  sent to the API!");
//     } catch (error) {
//       console.error("❌ Error sending image to API:", error.response || error);
//       alert("❌ Failed to send image to the API.");
//     }
//     console.log(faceLivenessAnalysis);
//   };

//   return (
//     <>
//       <Alert
//         variation="info"
//         isDismissible={false}
//         hasIcon={false}
//         marginTop={tokens.space.large}
//       >
//         Session ID: {faceLivenessAnalysis.SessionId}
//       </Alert>
//       <Alert variation="info" isDismissible={false} hasIcon={false}>
//         Status: {faceLivenessAnalysis.Status}
//       </Alert>

//       <Alert variation="info" isDismissible={false} hasIcon={false}>
//         Confidence Score: {faceLivenessAnalysis.Confidence.toFixed(2)}%
//       </Alert>
//       <Alert variation="info" isDismissible={false} hasIcon={false}>
//         Confidence Score: {faceLivenessAnalysis.Confidence.toFixed(2)}%
//       </Alert>
//       <Button
//         variation="primary"
//         type="submit"
//         marginTop={tokens.space.large}
//         marginBottom={tokens.space.large}
//         onClick={tryagain}
//       >
//         Try Again
//       </Button>
//       <Button
//         variation="primary"
//         type="submit"
//         marginTop={tokens.space.medium}
//         marginBottom={tokens.space.large}
//         onClick={sendToAPI}
//       >
//         Send to API
//       </Button>
//       <Image
//         src={
//           "data:image/jpeg;base64," + faceLivenessAnalysis.ReferenceImage.Bytes
//         }
//         width="100%"
//         height="100%"
//         objectFit="cover"
//         objectPosition="50% 50%"
//       />
//     </>
//   );
// }

// export default ReferenceImage;
