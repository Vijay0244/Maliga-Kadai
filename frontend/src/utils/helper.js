export const formatDate = (dateString) =>{
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Kolkata", 
  });
};

export const formatDateTime = (dateString) =>{
  return new Date(dateString).toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, 
    timeZone: "Asia/Kolkata",
  });
};


export const formatPrice = (price) =>{
  return parseFloat(price).toFixed(2)
}