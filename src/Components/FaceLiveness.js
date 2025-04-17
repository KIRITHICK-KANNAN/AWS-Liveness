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
//             "https://vfseu.mioot.com/forms/UAT/PhotoVerify/Test/",
//             {
//               method: "POST",
//               headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//               },
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
//             document.getElementsByName("frm")[0].submit();
//           } else {
//             alert("❌ Failed to send image to the API.");
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

//       <form
//         name="frm"
//         method="post"
//         action={"https://vfseu.mioot.com/forms/UAT/PhotoVerify/submission/"}
//       >
//         <input
//           type="hidden"
//           id="session_id"
//           name="session_id"
//           value={session_id}
//         ></input>
//         <input
//           type="hidden"
//           id="session_token"
//           name="session_token"
//           value={session_token}
//         ></input>
//       </form>
//     </>
//   );
// }

// export default FaceLiveness;

// working but showing reference image page
// import React, { useEffect, useState } from "react";
// import { Loader } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";
// import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";
// import ReferenceImage from "./ReferenceImage"; // Make sure this file is imported correctly

// function FaceLiveness({ faceLivenessAnalysis }) {
//   const search = window.location.search;
//   const params = new URLSearchParams(search);
//   const session_id = params.get("session_id");
//   const session_token = params.get("session_token");

//   const [loading, setLoading] = useState(true);
//   const [sessionId, setSessionId] = useState(null);
//   const [livenessResult, setLivenessResult] = useState(null);

//   const endpoint = process.env.REACT_APP_ENV_API_URL || "";

//   useEffect(() => {
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

//       if (
//         data.statusCode === 200 &&
//         result.Status === "SUCCEEDED" &&
//         result.Confidence >= 0.9
//       ) {
//         const _response = await fetch(
//           "https://vfseu.mioot.com/forms/UAT/PhotoVerify/Test/",
//           {
//             method: "POST",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               session_id,
//               session_token,
//               image: result.ReferenceImage.Bytes,
//             }),
//           }
//         );

//         const _data = await _response.json();
//         console.log("data:::", _data);

//         if (_data.status === 1) {
//           setLivenessResult(result);
//           document.getElementsByName("frm")[0].submit();
//         } else {
//           alert("❌ Failed to send image to the API.");
//         }
//       } else {
//         alert("Face not detected as live or session failed. Please try again.");
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

//       {livenessResult && (
//         <ReferenceImage
//           // faceLivenessAnalysis={livenessResult}
//           tryagain={() => window.location.reload()}
//         />
//       )}

//       <form
//         name="frm"
//         method="post"
//         action="https://vfseu.mioot.com/forms/UAT/PhotoVerify/submission/"
//       >
//         <input
//           type="hidden"
//           id="session_id"
//           name="session_id"
//           value={session_id}
//         />
//         <input
//           type="hidden"
//           id="session_token"
//           name="session_token"
//           value={session_token}
//         />
//       </form>
//     </>
//   );
// }

// // export default FaceLiveness;

// session and confidence appears
// import React, { useEffect, useState } from "react";
// import { Loader } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";
// import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";
// import ReferenceImage from "./ReferenceImage"; // Keep this if you still want to show in failure cases

// function FaceLiveness({ faceLivenessAnalysis }) {
//   const search = window.location.search;
//   const params = new URLSearchParams(search);
//   const session_id = params.get("session_id");
//   const session_token = params.get("session_token");

//   const [loading, setLoading] = useState(true);
//   const [sessionId, setSessionId] = useState(null);
//   const [livenessResult, setLivenessResult] = useState(null);

//   const endpoint = process.env.REACT_APP_ENV_API_URL || "";

//   useEffect(() => {
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

//       if (
//         data.statusCode === 200 &&
//         result.Status === "SUCCEEDED" &&
//         result.Confidence >= 0.9
//       ) {
//         const _response = await fetch(
//           "https://vfseu.mioot.com/forms/UAT/PhotoVerify/Test/",
//           {
//             method: "POST",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               session_id,
//               session_token,
//               image: result.ReferenceImage.Bytes,
//             }),
//           }
//         );

//         const _data = await _response.json();
//         console.log("Verification API Response:", _data);

//         if (_data.status === 1) {
//           // ✅ Directly submit the form, skip intermediate screen
//           document.getElementsByName("frm")[0].submit();
//         } else {
//           alert("❌ Failed to send image to the verification API.");
//           setLivenessResult({ ...result, error: true });
//         }
//       } else {
//         alert("Face not detected as live or session failed. Please try again.");
//         setLivenessResult({ ...result, error: true });
//       }

//       faceLivenessAnalysis(result);
//     } catch (err) {
//       console.error("Error fetching liveness results:", err);
//       alert("There was an error analyzing the face. Please try again.");
//       setLivenessResult({ error: true });
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
//             console.error("Face Liveness Error:", error);
//           }}
//         />
//       )}

//       {livenessResult?.error && (
//         <ReferenceImage
//           faceLivenessAnalysis={livenessResult}
//           tryagain={() => window.location.reload()}
//         />
//       )}

//       <form
//         name="frm"
//         method="post"
//         action="https://vfseu.mioot.com/forms/UAT/PhotoVerify/submission/"
//       >
//         <input
//           type="hidden"
//           id="session_id"
//           name="session_id"
//           value={session_id}
//         />
//         <input
//           type="hidden"
//           id="session_token"
//           name="session_token"
//           value={session_token}
//         />
//       </form>
//     </>
//   );
// }

// export default FaceLiveness;

// this doesnt show the alert message and shows the reference image page

// import React, { useEffect, useState } from "react";
// import { Loader, Button } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";
// import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";

// function FaceLiveness({ faceLivenessAnalysis }) {
//   const search = window.location.search;
//   const params = new URLSearchParams(search);
//   const session_id = params.get("session_id");
//   const session_token = params.get("session_token");

//   const [loading, setLoading] = useState(true);
//   const [sessionId, setSessionId] = useState(null);
//   const [livenessFailed, setLivenessFailed] = useState(false);

//   const endpoint = process.env.REACT_APP_ENV_API_URL || "";

//   useEffect(() => {
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

//       if (
//         data.statusCode === 200 &&
//         result.Status === "SUCCEEDED" &&
//         result.Confidence >= 0.9
//       ) {
//         const _response = await fetch(
//           "https://vfseu.mioot.com/forms/UAT/PhotoVerify/Test/",
//           {
//             method: "POST",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               session_id,
//               session_token,
//               image: result.ReferenceImage.Bytes,
//             }),
//           }
//         );

//         const _data = await _response.json();
//         console.log("Verification API Response:", _data);

//         if (_data.status === 1) {
//           document.getElementsByName("frm")[0].submit();
//         } else {
//           setLivenessFailed(true);
//         }
//       } else {
//         setLivenessFailed(true);
//       }

//       faceLivenessAnalysis(result);
//     } catch (err) {
//       console.error("Error fetching liveness results:", err);
//       setLivenessFailed(true);
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <FaceLivenessDetector
//             sessionId={sessionId}
//             region="us-east-1"
//             onAnalysisComplete={handleAnalysisComplete}
//             onError={(error) => {
//               console.error("Face Liveness Error:", error);
//               setLivenessFailed(true);
//             }}
//           />

//           {livenessFailed && (
//             <div style={{ textAlign: "center", marginTop: "1rem" }}>
//               <Button
//                 variation="primary"
//                 onClick={() => window.location.reload()}
//               >
//                 Try Again
//               </Button>
//             </div>
//           )}
//         </>
//       )}

//       <form
//         name="frm"
//         method="post"
//         action="https://vfseu.mioot.com/forms/UAT/PhotoVerify/submission/"
//       >
//         <input
//           type="hidden"
//           id="session_id"
//           name="session_id"
//           value={session_id}
//         />
//         <input
//           type="hidden"
//           id="session_token"
//           name="session_token"
//           value={session_token}
//         />
//       </form>
//     </>
//   );
// }

// export default FaceLiveness;

//working for everything

// import React, { useEffect, useState } from "react";
// import { Loader, Button } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";
// import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";

// function FaceLiveness({ faceLivenessAnalysis }) {
//   const search = window.location.search;
//   const params = new URLSearchParams(search);
//   const session_id = params.get("session_id");
//   const session_token = params.get("session_token");

//   const [loading, setLoading] = useState(true);
//   const [sessionId, setSessionId] = useState(null);
//   const [livenessFailed, setLivenessFailed] = useState(false);

//   const endpoint = process.env.REACT_APP_ENV_API_URL || "";

//   useEffect(() => {
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

//       if (
//         data.statusCode === 200 &&
//         result.Status === "SUCCEEDED" &&
//         result.Confidence >= 0.9
//       ) {
//         const _response = await fetch(
//           "https://vfseu.mioot.com/forms/UAT/PhotoVerify/Test/",
//           {
//             method: "POST",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               session_id,
//               session_token,
//               image: result.ReferenceImage.Bytes,
//             }),
//           }
//         );

//         const _data = await _response.json();
//         console.log("Verification API Response:", _data);

//         if (_data.status === 1) {
//           document.getElementsByName("frm")[0].submit();
//         } else {
//           alert(
//             "Face not detected as live. Please try again with a real face."
//           );
//           setLivenessFailed(true);
//         }
//       } else {
//         alert("Face not detected as live. Please try again with a real face.");
//         setLivenessFailed(true);
//       }

//       faceLivenessAnalysis(result);
//     } catch (err) {
//       console.error("Error fetching liveness results:", err);
//       alert("Face not detected as live. Please try again with a real face.");
//       setLivenessFailed(true);
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <FaceLivenessDetector
//             sessionId={sessionId}
//             region="us-east-1"
//             onAnalysisComplete={handleAnalysisComplete}
//             onError={(error) => {
//               console.error("Face Liveness Error:", error);
//               alert(
//                 "Face not detected as live. Please try again with a real face."
//               );
//               setLivenessFailed(true);
//             }}
//           />

//           {livenessFailed && (
//             <div style={{ textAlign: "center", marginTop: "1rem" }}>
//               <Button
//                 variation="primary"
//                 onClick={() => window.location.reload()}
//               >
//                 Try Again
//               </Button>
//             </div>
//           )}
//         </>
//       )}

//       <form
//         name="frm"
//         method="post"
//         action="https://vfseu.mioot.com/forms/UAT/PhotoVerify/submission/"
//       >
//         <input
//           type="hidden"
//           id="session_id"
//           name="session_id"
//           value={session_id}
//         />
//         <input
//           type="hidden"
//           id="session_token"
//           name="session_token"
//           value={session_token}
//         />
//       </form>
//     </>
//   );
// }

// export default FaceLiveness;

import React, { useEffect, useState } from "react";
import { Loader, Button } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";

function FaceLiveness({ faceLivenessAnalysis }) {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const session_id = params.get("session_id");
  const session_token = params.get("session_token");

  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [livenessFailed, setLivenessFailed] = useState(false);

  const endpoint = process.env.REACT_APP_ENV_API_URL || "";

  useEffect(() => {
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

      if (
        data.statusCode === 200 &&
        result.Status === "SUCCEEDED" &&
        result.Confidence >= 95
        // (result.Confidence === 0.9 || result.Confidence === 0.92)
      ) {
        const _response = await fetch(
          "https://vfseu.mioot.com/forms/UAT/PhotoVerify/Test/",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              session_id,
              session_token,
              image: result.ReferenceImage.Bytes,
            }),
          }
        );

        const _data = await _response.json();
        console.log("Verification API Response:", _data);

        if (_data.status === 1) {
          document.getElementsByName("frm")[0].submit();
        } else {
          alert(
            "Face not detected as live. Please try again with a real face."
          );
          setLivenessFailed(true);
        }
      } else {
        alert("Face not detected as live. Please try again with a real face.");
        setLivenessFailed(true);
      }

      faceLivenessAnalysis(result);
    } catch (err) {
      console.error("Error fetching liveness results:", err);
      alert("Face not detected as live. Please try again with a real face.");
      setLivenessFailed(true);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <FaceLivenessDetector
            sessionId={sessionId}
            region="us-east-1"
            onAnalysisComplete={handleAnalysisComplete}
            onError={(error) => {
              console.error("Face Liveness Error:", error);
              alert(
                "Face not detected as live. Please try again with a real face."
              );
              setLivenessFailed(true);
            }}
          />

          {livenessFailed && (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <Button
                variation="primary"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          )}
        </>
      )}

      <form
        name="frm"
        method="post"
        action="https://vfseu.mioot.com/forms/UAT/PhotoVerify/submission/"
      >
        <input
          type="hidden"
          id="session_id"
          name="session_id"
          value={session_id}
        />
        <input
          type="hidden"
          id="session_token"
          name="session_token"
          value={session_token}
        />
      </form>
    </>
  );
}

export default FaceLiveness;
