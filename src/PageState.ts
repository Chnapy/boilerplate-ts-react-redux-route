
export type PageState = PageStateLoading
    | PageStateSuccess
    | PageStateError;

export type PageStateLoading = {
    type: 'loading';
}

export type PageStateSuccess = {
    type: 'success';
    // pagePayload: PagePayload;
}

export type PageStateError = {
    type: 'error';
    errorCode: number;
    errorMessage: string;
}