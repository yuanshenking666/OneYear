
import { Note, Footprint } from '../types';

/**
 * 将对象序列化并 Base64 编码，生成分享后缀
 */
export const generateSyncLink = (type: 'note' | 'footprint', data: any) => {
  const payload = JSON.stringify({ type, data });
  const encoded = btoa(encodeURIComponent(payload));
  const url = new URL(window.location.href);
  url.searchParams.set('sync', encoded);
  return url.toString();
};

/**
 * 检查并从 URL 中解析同步数据
 */
export const checkIncomingSync = (
  onSyncNote: (note: Note) => void,
  onSyncFootprint: (fp: Footprint) => void
) => {
  const params = new URLSearchParams(window.location.search);
  const syncData = params.get('sync');
  
  if (syncData) {
    try {
      const decoded = decodeURIComponent(atob(syncData));
      const { type, data } = JSON.parse(decoded);
      
      if (type === 'note') onSyncNote(data);
      if (type === 'footprint') onSyncFootprint(data);
      
      // 清除 URL 中的参数，防止重复添加
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      
      return true;
    } catch (e) {
      console.error("同步失败", e);
    }
  }
  return false;
};
