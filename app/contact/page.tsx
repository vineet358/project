"use client";

import React from 'react';


function ContactPage() {
  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl overflow-hidden relative">

        <div className="flex justify-between items-center px-8 py-6">
          <div className="font-medium text-xl text-gray-800"></div>
          <div className="flex items-center gap-3">
            <span className="text-gray-600 text-sm">MENU</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </div>
        </div>

      
        <div className="relative px-8 pb-12">
          <div className="absolute text-[200px] font-bold text-gray-100 opacity-10" 
               style={{
                 left: '70px',
                 top: '0px',
                 transform: 'rotate(-90deg) translate(-100%, -100%)',
                 transformOrigin: 'left top',
                 letterSpacing: '-0.05em'
               }}>
            CONTACT
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 z-10 md:pr-8 mb-8 md:mb-0">
              <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
              <p className="text-gray-600 text-sm">We are always happy to assist you kindly.</p>
            </div>
          
            <div className="md:w-1/2 flex gap-3">
              <div className="rounded-xl overflow-hidden flex-1">
              <img 
  src="/images/office.jpg" 
  alt="Office meeting" 
  className="w-full h-full object-cover object-top"
/>
              </div>
              <div className="rounded-xl overflow-hidden flex-1">
              <img 
  src="/images/bb.jpg" 
  alt="Laptop workspace" 
  className="w-full h-full object-cover object-bottom"
/>
              </div>
            </div>
          </div>
        </div>

        
        <div className="text-center mb-10">
          <h2 className="text-xl font-medium text-gray-800">Let us know how we can help</h2>
        </div>

        
        <div className="flex justify-center space-x-20 px-8 mb-12">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <p className="text-xs text-gray-600">02-574-6497</p>
          </div>
          
         
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <p className="text-xs text-gray-600 text-center">110 Sejong-daero, Jung-gu, Seoul, South Korea</p>
          </div>
          
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <p className="text-xs text-gray-600">info@expoinsight.com</p>
          </div>
        </div>

        
        <div className="flex justify-center mb-12">
          <button className="px-10 py-3 bg-white text-gray-800 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            SEND REQUEST
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;