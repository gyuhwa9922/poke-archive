export const categoryMap = {
  free: '자유게시판',
  guide: '질문게시판',
  battle: '공략',
  party: '파티공유',
};

export const reverseCategoryMap = {
  자유게시판: 'free',
  질문게시판: 'guide',
  공략: 'battle',
  파티공유: 'party',
};

export const categoryColors: Record<string, { text: string; bg: string; border: string }> = {
  전체:      { text: 'text-slate-600',   bg: 'bg-slate-100', border: 'border-slate-300' },
  자유게시판: { text: 'text-[#00bba7]',  bg: 'bg-[#e6f7f5]', border: 'border-[#00bba7]/40' },
  질문게시판: { text: 'text-pink-500',   bg: 'bg-pink-50',   border: 'border-pink-300' },
  파티공유:  { text: 'text-amber-500',  bg: 'bg-amber-50',  border: 'border-amber-300' },
  공략:      { text: 'text-blue-500',   bg: 'bg-blue-50',   border: 'border-blue-300' },
  공지:      { text: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-300' },
};

export function formatDate(dateStr: string): string {
  return dateStr.split('T')[0].replace(/-/g, '.');
}