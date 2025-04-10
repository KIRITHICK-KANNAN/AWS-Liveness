import React from "react";
import { useEffect } from "react";
import { Loader } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";
import Header from "./Header";

function FaceLiveness({ faceLivenessAnalysis }) {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const session_id = params.get("session_id");
  const session_token = params.get("session_token");
  console.log("session_id", session_id);
  console.log("session_token", session_token);

  const [loading, setLoading] = React.useState(true);
  const [sessionId, setSessionId] = React.useState(null);

  const endpoint = process.env.REACT_APP_ENV_API_URL
    ? process.env.REACT_APP_ENV_API_URL
    : "";

  useEffect(() => {
    /*
     * API call to create the Face Liveness Session
     */
    const fetchCreateLiveness = async () => {
      const response = await fetch(endpoint + "createfacelivenesssession");
      const data = await response.json();
      setSessionId(data.sessionId);
      setLoading(false);
    };
    fetchCreateLiveness();
  }, []);

  const handleAnalysisComplete = async () => {
    try {
      const response = await fetch(endpoint + "getfacelivenesssessionresults", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionid: sessionId }),
      });

      const data = await response.json();
      const result = data.body;

      console.log("Liveness result:", session_id, session_token, result);
      if (data.statusCode == 200) {
        if (data.body.Status == "SUCCEEDED") {
          const _response = await fetch(
            "https://vfseu.mioot.com/forms/UAT/PhotoVerify/Test/",
            {
              method: "POST",
<<<<<<< HEAD
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
=======
              headers: { "Content-Type": "application/json" },
>>>>>>> 4f4770880be824514c69f3713cb4d56a107d2ae9
              body: JSON.stringify({
                session_id: session_id,
                session_token: session_token,
                image: data.body.ReferenceImage.Bytes,
              }),
            }
          );
<<<<<<< HEAD

          const _data = await _response.json();
          console.log("data:::", _data);
          // if ((_data.status = 1)) {
          // } else {
          // }
=======
          const _data = await _response.json();
          console.log("data:::", _data);
          if ((_data.status = 1)) {
          } else {
          }
>>>>>>> 4f4770880be824514c69f3713cb4d56a107d2ae9
        }
      }
      //
      if (result.Confidence < 0.9) {
        alert("Face not detected as live. Please try again with a real face.");
      }

      faceLivenessAnalysis(result);
    } catch (err) {
      console.error("Error fetching liveness results:", err);
      alert("There was an error analyzing the face. Please try again.");
    }
  };

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <FaceLivenessDetector
          sessionId={sessionId}
          region="us-east-1"
          onAnalysisComplete={handleAnalysisComplete}
          onError={(error) => {
            console.error(error);
          }}
        />
      )}
    </>
  );
}

export default FaceLiveness;

// import React, { useEffect, useState } from "react";
// import { Loader } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";
// import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";

// function FaceLiveness({ faceLivenessAnalysis }) {
//   const search = window.location.search;
//   const params = new URLSearchParams(search);
//   const session_id = params.get("session_id");
//   const session_token = params.get("session_token");
//   console.log("session_id", session_id);
//   console.log("session_token", session_token);

//   const [loading, setLoading] = useState(true);
//   const [sessionId, setSessionId] = useState(null);

//   const endpoint = process.env.REACT_APP_ENV_API_URL
//     ? process.env.REACT_APP_ENV_API_URL
//     : "";

//   useEffect(() => {
//     /*
//      * First make a POST request to the external Test API,
//      * then create the Face Liveness Session.
//      */
//     const initializeLivenessFlow = async () => {
//       try {
//         // Step 1: Call external Test API
//         const testResponse = await fetch(
//           "https://vfseu.mioot.com/forms/UAT/PhotoVerify/Test/",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               session_id: session_id,
//               session_token: session_token,
//             }),
//           }
//         );

//         const testData = await testResponse.json();
//         console.log("Test API response:", testData);

//         // Step 2: Create the liveness session
//         const response = await fetch(endpoint + "createfacelivenesssession");
//         const data = await response.json();
//         setSessionId(data.sessionId);
//         setLoading(false);
//       } catch (error) {
//         console.error("Initialization error:", error);
//         alert("Initialization failed. Please try again.");
//       }
//     };

//     initializeLivenessFlow();
//   }, []);

//   const handleAnalysisComplete = async () => {
//     try {
//       const response = await fetch(endpoint + "getfacelivenesssessionresults", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ sessionid: sessionId }),
//       });

//       const data = await response.json();
//       const result = data.body;

//       console.log("Liveness result:", session_id, session_token, result);
//       if (data.statusCode === 200) {
//         if (data.body.Status === "SUCCEEDED") {
//           const _response = await fetch(
//             "https://vfseu.mioot.com/forms/UAT/PhotoVerify/api/uploadImages/uploadCapture.php",
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 session_id: session_id,
//                 session_token: session_token,
//                 image: data.body.ReferenceImage.Bytes,
//               }),
//             }
//           );
//           const _data = await _response.json();
//           console.log("Upload API response:", _data);

//           if (_data.status === 1) {
//             // Success flow (optional)
//           } else {
//             // Handle failure (optional)
//           }
//         }
//       }

//       if (result.Confidence < 0.9) {
//         alert("Face not detected as live. Please try again with a real face.");
//       }

//       faceLivenessAnalysis(result);
//     } catch (err) {
//       console.error("Error fetching liveness results:", err);
//       alert("There was an error analyzing the face. Please try again.");
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <FaceLivenessDetector
//           sessionId={sessionId}
//           region="us-east-1"
//           onAnalysisComplete={handleAnalysisComplete}
//           onError={(error) => {
//             console.error(error);
//           }}
//         />
//       )}
//     </>
//   );
// }

// export default FaceLiveness;
