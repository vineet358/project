(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_auth_page_tsx_e97631e9._.js", {

"[project]/app/auth/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// "use client"
// import type React from "react"
// import { useState } from "react"
// import { Eye, EyeOff, Mail, User } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true)
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [username, setUsername] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [errors, setErrors] = useState<{
//     email?: string
//     password?: string
//     username?: string
//     confirmPassword?: string
//   }>({})
//   const validateLoginForm = () => {
//     const newErrors: { email?: string; password?: string } = {}
//     if (!email) {
//       newErrors.email = "Email is required"
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Email is invalid"
//     }
//     if (!password) {
//       newErrors.password = "Password is required"
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters"
//     }
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }
//   const validateSignupForm = () => {
//     const newErrors: {
//       email?: string
//       password?: string
//       username?: string
//       confirmPassword?: string
//     } = {}
//     if (!username) {
//       newErrors.username = "Username is required"
//     }
//     if (!email) {
//       newErrors.email = "Email is required"
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Email is invalid"
//     }
//     if (!password) {
//       newErrors.password = "Password is required"
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters"
//     }
//     if (!confirmPassword) {
//       newErrors.confirmPassword = "Please confirm your password"
//     } else if (confirmPassword !== password) {
//       newErrors.confirmPassword = "Passwords do not match"
//     }
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }
//   const handleLoginSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (validateLoginForm()) {
//       // Here you would typically call your authentication API
//       console.log("Login attempt with:", { email, password })
//       // For demo purposes, let's simulate a successful login
//       alert("Login successful! (This is just a demo)")
//     }
//   }
//   const handleSignupSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (validateSignupForm()) {
//       // Here you would typically call your registration API
//       console.log("Signup attempt with:", { username, email, password })
//       // For demo purposes, let's simulate a successful signup
//       alert("Signup successful! (This is just a demo)")
//       // Optionally switch to login view after successful signup
//       setIsLogin(true)
//     }
//   }
//   const handleSocialAuth = (provider: string) => {
//     // Here you would implement social login/signup logic
//     console.log(`${isLogin ? "Logging in" : "Signing up"} with ${provider}`)
//     alert(`${provider} ${isLogin ? "login" : "signup"} would be implemented here`)
//   }
//   const toggleAuthMode = () => {
//     setIsLogin(!isLogin)
//     setErrors({})
//   }
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-pink-50 p-4">
//       <div className="relative mx-auto flex w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl">
//         <button className="absolute right-4 top-4 z-10 text-gray-500 hover:text-gray-700">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//         {/* Left side with illustration */}
//         <div className="hidden w-1/2 bg-pink-100 lg:block">
//           <div className="relative h-full w-full p-6">
//             <div className="absolute left-6 top-6 font-bold text-pink-700">Mofitask.</div>
//             <div className="flex h-full items-center justify-center">
//               <Image
//                 src="/placeholder.svg?height=400&width=400"
//                 alt="Authentication illustration"
//                 width={400}
//                 height={400}
//                 className="h-auto w-full max-w-md"
//                 priority
//               />
//             </div>
//           </div>
//         </div>
//         {/* Right side with auth form */}
//         <div className="w-full p-8 lg:w-1/2">
//           <div className="mx-auto max-w-md">
//             <h1 className="mb-8 text-3xl font-bold">{isLogin ? "Login" : "Sign Up"}</h1>
//             {isLogin ? (
//               // Login Form
//               <form onSubmit={handleLoginSubmit}>
//                 <div className="mb-6">
//                   <label htmlFor="email" className="mb-2 block font-medium">
//                     Email
//                   </label>
//                   <div className="relative">
//                     <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
//                       <Mail className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       id="email"
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className={`w-full rounded-md border ${
//                         errors.email ? "border-red-500" : "border-gray-300"
//                       } py-3 pl-10 pr-3 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500`}
//                       placeholder="daniel@fisher@gmail.com"
//                     />
//                   </div>
//                   {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
//                 </div>
//                 <div className="mb-6">
//                   <div className="mb-2 flex items-center justify-between">
//                     <label htmlFor="password" className="block font-medium">
//                       Password
//                     </label>
//                   </div>
//                   <div className="relative">
//                     <input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className={`w-full rounded-md border ${
//                         errors.password ? "border-red-500" : "border-gray-300"
//                       } py-3 px-3 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500`}
//                       placeholder="••••••••"
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                     </button>
//                   </div>
//                   {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
//                   <div className="mt-2 text-right">
//                     <Link href="/forgot-password" className="text-sm font-medium text-amber-500 hover:text-amber-600">
//                       Forgot Password?
//                     </Link>
//                   </div>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full rounded-md bg-pink-500 py-3 font-medium text-white transition-colors hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
//                 >
//                   Log In
//                 </button>
//               </form>
//             ) : (
//               // Sign Up Form
//               <form onSubmit={handleSignupSubmit}>
//                 <div className="mb-6">
//                   <label htmlFor="username" className="mb-2 block font-medium">
//                     Username
//                   </label>
//                   <div className="relative">
//                     <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
//                       <User className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       id="username"
//                       type="text"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       className={`w-full rounded-md border ${
//                         errors.username ? "border-red-500" : "border-gray-300"
//                       } py-3 pl-10 pr-3 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500`}
//                       placeholder="johndoe"
//                     />
//                   </div>
//                   {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
//                 </div>
//                 <div className="mb-6">
//                   <label htmlFor="signup-email" className="mb-2 block font-medium">
//                     Email
//                   </label>
//                   <div className="relative">
//                     <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
//                       <Mail className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       id="signup-email"
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className={`w-full rounded-md border ${
//                         errors.email ? "border-red-500" : "border-gray-300"
//                       } py-3 pl-10 pr-3 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500`}
//                       placeholder="john.doe@example.com"
//                     />
//                   </div>
//                   {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
//                 </div>
//                 <div className="mb-6">
//                   <label htmlFor="signup-password" className="mb-2 block font-medium">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       id="signup-password"
//                       type={showPassword ? "text" : "password"}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className={`w-full rounded-md border ${
//                         errors.password ? "border-red-500" : "border-gray-300"
//                       } py-3 px-3 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500`}
//                       placeholder="••••••••"
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                     </button>
//                   </div>
//                   {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
//                 </div>
//                 <div className="mb-6">
//                   <label htmlFor="confirm-password" className="mb-2 block font-medium">
//                     Confirm Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       id="confirm-password"
//                       type={showConfirmPassword ? "text" : "password"}
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       className={`w-full rounded-md border ${
//                         errors.confirmPassword ? "border-red-500" : "border-gray-300"
//                       } py-3 px-3 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500`}
//                       placeholder="••••••••"
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     >
//                       {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                     </button>
//                   </div>
//                   {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full rounded-md bg-pink-500 py-3 font-medium text-white transition-colors hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
//                 >
//                   Sign Up
//                 </button>
//               </form>
//             )}
//             <div className="my-6 flex items-center">
//               <div className="flex-grow border-t border-gray-300"></div>
//               <span className="mx-4 text-sm text-gray-500">Or Continue With</span>
//               <div className="flex-grow border-t border-gray-300"></div>
//             </div>
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={() => handleSocialAuth("Google")}
//                 className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-50"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//                   <path
//                     fill="#EA4335"
//                     d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
//                   />
//                   <path
//                     fill="#34A853"
//                     d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
//                   />
//                   <path
//                     fill="#4A90E2"
//                     d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
//                   />
//                   <path
//                     fill="#FBBC05"
//                     d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
//                   />
//                 </svg>
//               </button>
//               <button
//                 onClick={() => handleSocialAuth("Facebook")}
//                 className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-50"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//                   <path
//                     fill="#1877F2"
//                     d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
//                   />
//                 </svg>
//               </button>
//               <button
//                 onClick={() => handleSocialAuth("Apple")}
//                 className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-50"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//                   <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2a4.44 4.44 0 0 0-3 1.52 4.17 4.17 0 0 0-1 3.09 3.69 3.69 0 0 0 2.94-1.42zm2.52 7.44a4.51 4.51 0 0 1 2.16-3.81 4.66 4.66 0 0 0-3.66-2c-1.56-.16-3 .91-3.83.91s-2-.89-3.3-.87a4.92 4.92 0 0 0-4.14 2.53C2.93 12.45 4.24 17 6 19.47c.8 1.21 1.8 2.58 3.12 2.53s1.75-.82 3.28-.82 2 .82 3.3.79 2.22-1.24 3.06-2.45a11 11 0 0 0 1.38-2.85 4.41 4.41 0 0 1-2.68-4.04z" />
//                 </svg>
//               </button>
//             </div>
//             <div className="mt-8 text-center">
//               <p className="text-sm text-gray-600">
//                 {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//                 <button
//                   type="button"
//                   onClick={toggleAuthMode}
//                   className="font-medium text-pink-600 hover:text-pink-700"
//                 >
//                   {isLogin ? "Sign up here" : "Login here"}
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
__turbopack_context__.s({
    "default": (()=>AuthPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function AuthPage({ mode }) {
    _s();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [confirmPassword, setConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showConfirmPassword, setShowConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    function handleLoginSubmit(event) {
        throw new Error("Function not implemented.");
    }
    function handleSignupSubmit(event) {
        throw new Error("Function not implemented.");
    }
    // Validation and submit handlers remain the same as original
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen items-center justify-center bg-[#F4F4F4] p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative mx-auto flex w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "absolute right-4 top-4 z-10 text-[#333333] hover:text-[#0077B6]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        className: "h-6 w-6",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M6 18L18 6M6 6l12 12"
                        }, void 0, false, {
                            fileName: "[project]/app/auth/page.tsx",
                            lineNumber: 436,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/auth/page.tsx",
                        lineNumber: 429,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/auth/page.tsx",
                    lineNumber: 428,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden w-1/2 bg-[#0077B6] lg:block",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-full w-full p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-6 top-6 font-bold text-white",
                                children: "Mofitask."
                            }, void 0, false, {
                                fileName: "[project]/app/auth/page.tsx",
                                lineNumber: 443,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-full items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/placeholder.svg?height=400&width=400",
                                    alt: "Authentication illustration",
                                    width: 400,
                                    height: 400,
                                    className: "h-auto w-full max-w-md",
                                    priority: true
                                }, void 0, false, {
                                    fileName: "[project]/app/auth/page.tsx",
                                    lineNumber: 445,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/auth/page.tsx",
                                lineNumber: 444,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/auth/page.tsx",
                        lineNumber: 442,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/auth/page.tsx",
                    lineNumber: 441,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full p-8 lg:w-1/2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto max-w-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "mb-8 text-3xl font-bold text-[#333333]",
                                children: mode === 'login' ? "Login" : "Sign Up"
                            }, void 0, false, {
                                fileName: "[project]/app/auth/page.tsx",
                                lineNumber: 460,
                                columnNumber: 13
                            }, this),
                            mode === 'login' ? // Login Form
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleLoginSubmit,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "email",
                                                className: "mb-2 block font-medium text-[#333333]",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 469,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "pointer-events-none absolute inset-y-0 left-3 flex items-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                            className: "h-5 w-5 text-[#333333]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 474,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/auth/page.tsx",
                                                        lineNumber: 473,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        id: "email",
                                                        type: "email",
                                                        value: email,
                                                        onChange: (e)=>setEmail(e.target.value),
                                                        className: `w-full rounded-md border ${errors.email ? "border-red-500" : "border-gray-300"} py-3 pl-10 pr-3 text-[#333333] focus:border-[#0077B6] focus:outline-none focus:ring-1 focus:ring-[#0077B6]`,
                                                        placeholder: "daniel@fisher@gmail.com"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/auth/page.tsx",
                                                        lineNumber: 476,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 472,
                                                columnNumber: 19
                                            }, this),
                                            errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm text-red-500",
                                                children: errors.email
                                            }, void 0, false, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 487,
                                                columnNumber: 36
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/auth/page.tsx",
                                        lineNumber: 468,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-2 flex items-center justify-between",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "password",
                                                    className: "block font-medium text-[#333333]",
                                                    children: "Password"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/page.tsx",
                                                    lineNumber: 493,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 492,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        id: "password",
                                                        type: showPassword ? "text" : "password",
                                                        value: password,
                                                        onChange: (e)=>setPassword(e.target.value),
                                                        className: `w-full rounded-md border ${errors.password ? "border-red-500" : "border-gray-300"} py-3 px-3 text-[#333333] focus:border-[#0077B6] focus:outline-none focus:ring-1 focus:ring-[#0077B6]`,
                                                        placeholder: "••••••••"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/auth/page.tsx",
                                                        lineNumber: 498,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "absolute inset-y-0 right-0 flex items-center pr-3 text-[#333333] hover:text-[#0077B6]",
                                                        onClick: ()=>setShowPassword(!showPassword),
                                                        children: showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                            className: "h-5 w-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 513,
                                                            columnNumber: 39
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                            className: "h-5 w-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 513,
                                                            columnNumber: 72
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/auth/page.tsx",
                                                        lineNumber: 508,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 497,
                                                columnNumber: 19
                                            }, this),
                                            errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm text-red-500",
                                                children: errors.password
                                            }, void 0, false, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 516,
                                                columnNumber: 39
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 text-right",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/forgot-password",
                                                    className: "text-sm font-medium text-[#FF6F61] hover:text-[#FF5349]",
                                                    children: "Forgot Password?"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/page.tsx",
                                                    lineNumber: 518,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 517,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/auth/page.tsx",
                                        lineNumber: 491,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "w-full rounded-md bg-[#0077B6] py-3 font-medium text-white transition-colors hover:bg-[#006699] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2",
                                        children: "Log In"
                                    }, void 0, false, {
                                        fileName: "[project]/app/auth/page.tsx",
                                        lineNumber: 527,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/auth/page.tsx",
                                lineNumber: 466,
                                columnNumber: 15
                            }, this) : // Sign Up Form
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleSignupSubmit,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "username",
                                                className: "mb-2 block font-medium text-[#333333]",
                                                children: "Username"
                                            }, void 0, false, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 539,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "pointer-events-none absolute inset-y-0 left-3 flex items-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                            className: "h-5 w-5 text-[#333333]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 544,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/auth/page.tsx",
                                                        lineNumber: 543,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        id: "username",
                                                        type: "text",
                                                        value: username,
                                                        onChange: (e)=>setUsername(e.target.value),
                                                        className: `w-full rounded-md border ${errors.username ? "border-red-500" : "border-gray-300"} py-3 pl-10 pr-3 text-[#333333] focus:border-[#0077B6] focus:outline-none focus:ring-1 focus:ring-[#0077B6]`,
                                                        placeholder: "johndoe"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/auth/page.tsx",
                                                        lineNumber: 546,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 542,
                                                columnNumber: 19
                                            }, this),
                                            errors.username && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm text-red-500",
                                                children: errors.username
                                            }, void 0, false, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 557,
                                                columnNumber: 39
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/auth/page.tsx",
                                        lineNumber: 538,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "signup-email",
                                                className: "mb-2 block font-medium text-[#333333]",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 562,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "pointer-events-none absolute inset-y-0 left-3 flex items-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                            className: "h-5 w-5 text-[#333333]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 567,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/auth/page.tsx",
                                                        lineNumber: 566,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        id: "signup-email",
                                                        type: "email",
                                                        value: email,
                                                        onChange: (e)=>setEmail(e.target.value),
                                                        className: `w-full rounded-md border ${errors.email ? "border-red-500" : "border-gray-300"} py-3 pl-10 pr-3 text-[#333333] focus:border-[#0077B6] focus:outline-none focus:ring-1 focus:ring-[#0077B6]`,
                                                        placeholder: "john.doe@example.com"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/auth/page.tsx",
                                                        lineNumber: 569,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 565,
                                                columnNumber: 19
                                            }, this),
                                            errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm text-red-500",
                                                children: errors.email
                                            }, void 0, false, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 580,
                                                columnNumber: 36
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/auth/page.tsx",
                                        lineNumber: 561,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "signup-password",
                                                className: "mb-2 block font-medium text-[#333333]",
                                                children: "Password"
                                            }, void 0, false, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 585,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        id: "signup-password",
                                                        type: showPassword ? "text" : "password",
                                                        value: password,
                                                        onChange: (e)=>setPassword(e.target.value),
                                                        className: `w-full rounded-md border ${errors.password ? "border-red-500" : "border-gray-300"} py-3 px-3 text-[#333333] focus:border-[#0077B6] focus:outline-none focus:ring-1 focus:ring-[#0077B6]`,
                                                        placeholder: "••••••••"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/auth/page.tsx",
                                                        lineNumber: 589,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "absolute inset-y-0 right-0 flex items-center pr-3 text-[#333333] hover:text-[#0077B6]",
                                                        onClick: ()=>setShowPassword(!showPassword),
                                                        children: showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                            className: "h-5 w-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 604,
                                                            columnNumber: 39
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                            className: "h-5 w-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 604,
                                                            columnNumber: 72
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/auth/page.tsx",
                                                        lineNumber: 599,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 588,
                                                columnNumber: 19
                                            }, this),
                                            errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm text-red-500",
                                                children: errors.password
                                            }, void 0, false, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 607,
                                                columnNumber: 39
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/auth/page.tsx",
                                        lineNumber: 584,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "confirm-password",
                                                className: "mb-2 block font-medium text-[#333333]",
                                                children: "Confirm Password"
                                            }, void 0, false, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 612,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        id: "confirm-password",
                                                        type: showConfirmPassword ? "text" : "password",
                                                        value: confirmPassword,
                                                        onChange: (e)=>setConfirmPassword(e.target.value),
                                                        className: `w-full rounded-md border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} py-3 px-3 text-[#333333] focus:border-[#0077B6] focus:outline-none focus:ring-1 focus:ring-[#0077B6]`,
                                                        placeholder: "••••••••"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/auth/page.tsx",
                                                        lineNumber: 616,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "absolute inset-y-0 right-0 flex items-center pr-3 text-[#333333] hover:text-[#0077B6]",
                                                        onClick: ()=>setShowConfirmPassword(!showConfirmPassword),
                                                        children: showConfirmPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                            className: "h-5 w-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 631,
                                                            columnNumber: 46
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                            className: "h-5 w-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/auth/page.tsx",
                                                            lineNumber: 631,
                                                            columnNumber: 79
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/auth/page.tsx",
                                                        lineNumber: 626,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 615,
                                                columnNumber: 19
                                            }, this),
                                            errors.confirmPassword && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm text-red-500",
                                                children: errors.confirmPassword
                                            }, void 0, false, {
                                                fileName: "[project]/app/auth/page.tsx",
                                                lineNumber: 634,
                                                columnNumber: 46
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/auth/page.tsx",
                                        lineNumber: 611,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "w-full rounded-md bg-[#0077B6] py-3 font-medium text-white transition-colors hover:bg-[#006699] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2",
                                        children: "Sign Up"
                                    }, void 0, false, {
                                        fileName: "[project]/app/auth/page.tsx",
                                        lineNumber: 637,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/auth/page.tsx",
                                lineNumber: 536,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "my-6 flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-grow border-t border-gray-300"
                                    }, void 0, false, {
                                        fileName: "[project]/app/auth/page.tsx",
                                        lineNumber: 647,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mx-4 text-sm text-[#333333]",
                                        children: "Or Continue With"
                                    }, void 0, false, {
                                        fileName: "[project]/app/auth/page.tsx",
                                        lineNumber: 648,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-grow border-t border-gray-300"
                                    }, void 0, false, {
                                        fileName: "[project]/app/auth/page.tsx",
                                        lineNumber: 649,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/auth/page.tsx",
                                lineNumber: 646,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center space-x-4"
                            }, void 0, false, {
                                fileName: "[project]/app/auth/page.tsx",
                                lineNumber: 652,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 text-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-[#333333]",
                                    children: [
                                        mode === 'login' ? "Don't have an account?" : "Already have an account?",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: mode === 'login' ? "/signup" : "/signin",
                                            className: "font-medium text-[#0077B6] hover:text-[#006699]",
                                            children: mode === 'login' ? "Sign up here" : "Login here"
                                        }, void 0, false, {
                                            fileName: "[project]/app/auth/page.tsx",
                                            lineNumber: 659,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/auth/page.tsx",
                                    lineNumber: 657,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/auth/page.tsx",
                                lineNumber: 656,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/auth/page.tsx",
                        lineNumber: 459,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/auth/page.tsx",
                    lineNumber: 458,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/auth/page.tsx",
            lineNumber: 427,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/auth/page.tsx",
        lineNumber: 426,
        columnNumber: 5
    }, this);
}
_s(AuthPage, "GYO289ex/nSOMdiSCfZyV030aJ4=");
_c = AuthPage;
var _c;
__turbopack_context__.k.register(_c, "AuthPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_auth_page_tsx_e97631e9._.js.map