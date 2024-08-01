import{r as d,u as a,j as s,s as r}from"./index-8bb5f482.js";const c=d.memo(({reservation:e})=>{const i=a(),t=l=>new Date(l+"T12:00:00Z").toLocaleDateString("en-US",{month:"short",day:"numeric"}),n=()=>{i(`/trips/${e.id}?listingId=${e.listingId}`)};return s.jsxs("div",{onClick:n,className:`
                flex 
                w-[900px] 
                border 
                border-slate-100 
                mt-4 
                mb-5 
                rounded-2xl 
                shadow-lg
                cursor-pointer 
                transition 
                duration-300 
                transform 
                hover:shadow-xl 
                hover:scale-105 
                active:scale-95
            `,children:[s.jsxs("div",{className:"p-6 flex-1",children:[s.jsxs("div",{className:"mb-6",children:[s.jsx("h1",{className:"text-2xl font-medium pb-2",children:e.listing.title}),s.jsxs("h2",{children:["Entire home hosted by ",e.listing.host.firstName]})]}),s.jsx("hr",{className:"border-gray-200"}),s.jsxs("div",{className:"flex items-center mt-5",children:[s.jsxs("div",{children:[s.jsxs("p",{children:["Check in: ",t(e.checkIn)]}),s.jsxs("p",{children:["Check out: ",t(e.checkOut)]})]}),s.jsx("div",{className:"border-[0.5px] border-gray-200 h-24 mx-4"}),s.jsxs("div",{children:[s.jsxs("p",{children:[e.listing.address.split(",")[1],", ",r[e.listing.address.split(",")[2].trim().slice(0,2)]]}),s.jsx("p",{children:"United States"})]})]})]}),s.jsx("div",{className:"flex justify-end",children:s.jsx("img",{src:e.listing.photoUrls[0],alt:"Listing",className:"object-fill rounded-r-2xl w-80"})})]})});c.displayName="TripCard";export{c as default};
