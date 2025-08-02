import { format, formatDistanceToNow } from 'date-fns';

export const formatCurrency = (amount: number, currency: 'USD' | 'JMD' = 'USD'): string => {
  const exchangeRate = 160; // 1 USD = 160 JMD
  
  if (currency === 'JMD') {
    const jmdAmount = amount * exchangeRate;
    return new Intl.NumberFormat('en-JM', {
      style: 'currency',
      currency: 'JMD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(jmdAmount).replace('JMD', 'J$');
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatDateTime = (date: string): string => {
  return format(new Date(date), 'MMM dd, yyyy h:mm a');
};

export const formatRelativeTime = (date: string): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatDuration = (hours: number): string => {
  if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }
  const days = Math.floor(hours / 24);
  return `${days} ${days === 1 ? 'day' : 'days'}`;
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};