declare namespace API {
  type ASKVO = {
    accessKey?: string;
    secretKey?: string;
  };

  type BaseResponseASKVO_ = {
    code?: number;
    data?: ASKVO;
    message?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseInterfaceInfo_ = {
    code?: number;
    data?: InterfaceInfo;
    message?: string;
  };

  type BaseResponseListInterfaceDisplayVo_ = {
    code?: number;
    data?: InterfaceDisplayVo[];
    message?: string;
  };

  type BaseResponseListInterfaceInfoVO_ = {
    code?: number;
    data?: InterfaceInfoVO[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseObject_ = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageInterfaceInfo_ = {
    code?: number;
    data?: PageInterfaceInfo_;
    message?: string;
  };

  type BaseResponsePagePostComment_ = {
    code?: number;
    data?: PagePostComment_;
    message?: string;
  };

  type BaseResponsePagePostCommentVO_ = {
    code?: number;
    data?: PagePostCommentVO_;
    message?: string;
  };

  type BaseResponsePagePostVO_ = {
    code?: number;
    data?: PagePostVO_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserInterfaceInfo_ = {
    code?: number;
    data?: PageUserInterfaceInfo_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponsePostComment_ = {
    code?: number;
    data?: PostComment;
    message?: string;
  };

  type BaseResponsePostVO_ = {
    code?: number;
    data?: PostVO;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserInterfaceInfo_ = {
    code?: number;
    data?: UserInterfaceInfo;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type checkUsingGETParams = {
    /** echostr */
    echostr?: string;
    /** nonce */
    nonce?: string;
    /** signature */
    signature?: string;
    /** timestamp */
    timestamp?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getPostCommentByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getPostVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type IdRequest = {
    id?: number;
  };

  type InterfaceDisplayVo = {
    description?: string;
    id?: number;
    interfaceImg?: string;
    name?: string;
  };

  type InterfaceInfo = {
    createTime?: string;
    description?: string;
    id?: number;
    interfaceImg?: string;
    isDelete?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    updateTime?: string;
    url?: string;
    userId?: number;
  };

  type InterfaceInfoAddRequest = {
    description?: string;
    interfaceImg?: string;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    url?: string;
  };

  type InterfaceInfoInvokeRequest = {
    id?: number;
    userRequestParams?: string;
  };

  type InterfaceInfoQueryRequest = {
    current?: number;
    description?: string;
    id?: number;
    interfaceImg?: string;
    method?: string;
    name?: string;
    pageSize?: number;
    requestHeader?: string;
    responseHeader?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
    userId?: number;
  };

  type InterfaceInfoUpdateRequest = {
    description?: string;
    id?: number;
    interfaceImg?: string;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    url?: string;
  };

  type InterfaceInfoVO = {
    createTime?: string;
    description?: string;
    id?: number;
    interfaceImg?: string;
    isDelete?: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    totalNum?: number;
    updateTime?: string;
    url?: string;
    userId?: number;
  };

  type LoginUserVO = {
    accessKey?: string;
    createTime?: string;
    id?: number;
    secretKey?: string;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageInterfaceInfo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: InterfaceInfo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePostComment_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PostComment[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePostCommentVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PostCommentVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePostVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PostVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserInterfaceInfo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserInterfaceInfo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PostAddRequest = {
    content?: string;
    tags?: string[];
    title?: string;
  };

  type PostComment = {
    content?: string;
    createTime?: string;
    fatherId?: number;
    id?: number;
    postId?: number;
    updateTime?: string;
    userId?: number;
  };

  type PostCommentAddRequest = {
    content?: string;
    fatherId?: number;
    postId?: number;
  };

  type PostCommentQueryRequest = {
    content?: string;
    current?: number;
    id?: number;
    notId?: number;
    pageSize?: number;
    postId?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type PostCommentUpdateRequest = {
    content?: string;
    id?: number;
  };

  type PostCommentVO = {
    content?: string;
    createTime?: string;
    fatherId?: number;
    id?: number;
    postId?: number;
    son?: PostCommentVO[];
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type PostEditRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostFavourAddRequest = {
    postId?: number;
  };

  type PostFavourQueryRequest = {
    current?: number;
    pageSize?: number;
    postQueryRequest?: PostQueryRequest;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type PostQueryRequest = {
    content?: string;
    current?: number;
    favourUserId?: number;
    id?: number;
    notId?: number;
    orTags?: string[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type PostThumbAddRequest = {
    postId?: number;
  };

  type PostUpdateRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostVO = {
    commentNum?: number;
    content?: string;
    createTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    hasThumb?: boolean;
    id?: number;
    tagList?: string[];
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type TagsRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    tagNameList?: string[];
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    accessKey?: string;
    createTime?: string;
    gender?: string;
    id?: number;
    isDelete?: number;
    mpOpenId?: string;
    secretKey?: string;
    unionId?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserInterfaceInfo = {
    createTime?: string;
    id?: number;
    interfaceInfoId?: number;
    isDelete?: number;
    leftNum?: number;
    status?: number;
    totalNum?: number;
    updateTime?: string;
    userId?: number;
  };

  type UserInterfaceInfoAddRequest = {
    interfaceInfoId?: number;
    leftNum?: number;
    totalNum?: number;
    userId?: number;
  };

  type UserInterfaceInfoQueryRequest = {
    current?: number;
    id?: number;
    interfaceInfoId?: number;
    leftNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    totalNum?: number;
    userId?: number;
  };

  type UserInterfaceInfoUpdateRequest = {
    id?: number;
    leftNum?: number;
    status?: number;
    totalNum?: number;
  };

  type userLoginByWxOpenUsingGETParams = {
    /** code */
    code: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    mpOpenId?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    unionId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateMyRequest = {
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdatePasswordRequest = {
    checkPassword?: string;
    newPassword?: string;
    oldPassword?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
