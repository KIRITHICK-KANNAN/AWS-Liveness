// import React from "react";
// import { useEffect } from "react";
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

//   const [loading, setLoading] = React.useState(true);
//   const [sessionId, setSessionId] = React.useState(null);

//   const endpoint = process.env.REACT_APP_ENV_API_URL
//     ? process.env.REACT_APP_ENV_API_URL
//     : "";

//   useEffect(() => {
//     /*
//      * API call to create the Face Liveness Session
//      */
//     const fetchCreateLiveness = async () => {
//       const response = await fetch(endpoint + "createfacelivenesssession");
//       const data = await response.json();
//       setSessionId(data.sessionId);
//       setLoading(false);
//     };
//     fetchCreateLiveness();
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
//       if (data.statusCode == 200) {
//         if (data.body.Status == "SUCCEEDED") {
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
//           console.log("data:::", _data);
//           if ((_data.status = 1)) {
//           } else {
//           }
//         }
//       }
//       //
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

import React, { useEffect, useState } from "react";
import { Loader } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";

function FaceLiveness({ faceLivenessAnalysis }) {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const session_id = params.get("session_id");
  const session_token = params.get("session_token");
  console.log("session_id", session_id);
  console.log("session_token", session_token);

  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);

  const endpoint = process.env.REACT_APP_ENV_API_URL
    ? process.env.REACT_APP_ENV_API_URL
    : "";

  useEffect(() => {
    const fetchCreateLiveness = async () => {
      try {
        const response = await fetch(endpoint + "createfacelivenesssession");
        const data = await response.json();
        setSessionId(data.sessionId);
        setLoading(false);
      } catch (error) {
        console.error("Error creating liveness session:", error);
        alert("Failed to initialize liveness session.");
      }
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

      if (data.statusCode === 200 && result.Status === "SUCCEEDED") {
        // 🟢 Step 1: Call the Test API
        const testResponse = await fetch(
          "https://vfseu.mioot.com/forms/UAT/PhotoVerify/Test/"
        );

        const testData = await testResponse.text(); // assuming it's HTML/text response
        console.log("Test GET API response:", testData);

        const uploadResponse = await fetch(
          "https://vfseu.mioot.com/forms/UAT/PhotoVerify/api/uploadImages/uploadCapture.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              session_id: session_id,
              session_token: session_token,
              image: result.ReferenceImage.Bytes,
            }),
          }
        );

        const uploadData = await uploadResponse.json();
        console.log("Upload API response:", uploadData);

        if (uploadData.status === 1) {
          // Optionally handle success
        } else {
          // Optionally handle failure
        }
      }

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
