export const LAYOUT_COLLAPSED = 'global/changeLayoutCollapsed';

export const FETCH_NOTICES = 'global/fetchNotices';

export function noticesRequested() {
  return {
    type: FETCH_NOTICES,
  };
}

export const NOTICES_FAILED = 'global/requestNotesFailed';

export function noticesFailed(error) {
  return {
    type: NOTICES_FAILED,
    payload: error,
  };
}

export const NOTICES_SUCCEED = 'global/requestNotesSucceed';

export function noticesSucceed(notices) {
  return {
    type: NOTICES_SUCCEED,
    payload: notices,
  };
}
