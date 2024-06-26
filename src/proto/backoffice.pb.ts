/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";
import { Empty } from "./google/protobuf/empty.pb";
import { Struct } from "./google/protobuf/struct.pb";

export const protobufPackage = "backoffice";

/** 페이징 정보 */
export interface Paging {
  page: number;
  size: number;
  total: number;
  sort: string;
  order: string;
}

/** 기본 결과 메시지 */
export interface defaultResult {
  status: string;
  message: string;
}

export interface V1DeleteVideoRequest {
  id: number;
}

export interface V1DeleteVideoResponse {
  result: string;
  status: number;
  message: string;
}

export interface V1ListVideoRequest {
  page: number;
  limit: number;
  sort: string;
  order: string;
}

export interface V1ListVideoResponse {
  result: string;
  status: number;
  message: string;
  meta: V1ListVideoResponse_Paging | undefined;
  data: v1Result[];
}

export interface V1ListVideoResponse_Paging {
  page: number;
  limit: number;
  totalCount: number;
  totalPage: number;
  sort: string;
  order: string;
}

export interface V1GetVideoResponse {
  result: string;
  status: number;
  message: string;
  data: V1GetVideoResponse_DATA | undefined;
}

export interface V1GetVideoResponse_DATA {
  id: number;
  email: string;
  title: string;
  subTitle: string;
  description: string;
  ownerName: string;
  ownerNickName: string;
  ownerChannelName: string;
  ownerProfileIconUrl: string;
  thumbnailUrl: string;
  viewCount: number;
  reportCount: number;
  likesCount: number;
  duration: string;
  category: string;
  categorySub: string;
  categorySubCode: string;
  recordType: string;
  contentUrlList: string[];
  poseIndicatorList: string[];
  nodeId: string;
  createdAt: string;
}

export interface V1GetVideoRequest {
  id: number;
}

export interface v1Result {
  id: number;
  email: string;
  title: string;
  subTitle: string;
  description: string;
  ownerName: string;
  ownerNickName: string;
  ownerChannelName: string;
  ownerProfileIconUrl: string;
  thumbnailUrl: string;
  viewCount: number;
  reportCount: number;
  likesCount: number;
  duration: string;
  category: string;
  categorySub: string;
  categorySubCode: string;
  recordType: string;
  contentUrlList: string[];
  poseIndicatorList: string[];
  nodeId: string;
  createdAt: string;
}

export interface V1CreateVideoResponse {
  result: string;
  status: number;
  message: string;
  data: V1CreateVideoResponse_Data | undefined;
}

export interface V1CreateVideoResponse_Data {
  id: number;
  email: string;
  title: string;
  subTitle: string;
  description: string;
  ownerName: string;
  ownerNickName: string;
  ownerChannelName: string;
  ownerProfileIconUrl: string;
  thumbnailUrl: string;
  viewCount: number;
  reportCount: number;
  likesCount: number;
  duration: string;
  category: string;
  categorySub: string;
  categorySubCode: string;
  recordType: string;
  contentUrlList: string[];
  poseIndicatorList: string[];
  nodeId: string;
  createdAt: string;
}

export interface V1CreateVideoRequest {
  email: string;
  title: string;
  subTitle: string;
  description: string;
  ownerName: string;
  ownerNickName: string;
  ownerChannelName: string;
  ownerProfileIconUrl: string;
  thumbnailUrl: string;
  duration: string;
  category: string;
  categorySub: string;
  categorySubCode: string;
  recordType: string;
  contentUrlList: string[];
  poseIndicatorList: string[];
  nodeId: string;
}

export interface DefaultResult {
  result: string;
  status: number;
  message: string;
  data: DefaultResult_DATA[];
}

export interface DefaultResult_DATA {
  result: boolean;
}

export interface CreateVideoRequest {
  title: string;
  subTitle: string;
  description: string;
  recordType: string;
  fileList: string[];
  indicatorList: string[];
  nodeId: string;
  thumbnail: string;
  categoryId: string;
  subCategoryId: string;
  userId: string;
}

export interface CreateVideoResponse {
  result: DefaultResult | undefined;
}

export interface MakeQRCodeResponse {
  status: number;
  result: MakeQRCodeResponse_Result | undefined;
  error: string[];
}

export interface MakeQRCodeResponse_Result {
  url: string;
}

export interface MakeQRCodeRequest {
  /** 거래처코드번호 */
  nodeId: string;
}

export interface DeleteCustomerRequest {
  /** 거래처코드번호 */
  id: string;
}

export interface DeleteCustomerResponse {
  status: number;
  error: string[];
}

/** 거래처 테이블 */
export interface Customer {
  /** 거래처코드번호 */
  id: string;
  /** 거래처명 */
  name: string;
  /** 거래처설명 */
  description: string;
  /** 생성일 */
  createdAt: string;
  /** 수정일 */
  updatedAt: string;
}

/** 1. 거래처 등록 */
export interface CreateCustomerRequest {
  /** 거래처명 */
  name: string;
  /** 거래처설명 */
  description: string;
}

/** 1-1. 거래처 등록 결과 */
export interface CreateCustomerResponse {
  status: number;
  error: string[];
  result: CreateCustomerResponse_Result | undefined;
}

export interface CreateCustomerResponse_Result {
  id: string;
}

/** 2. 거래처 정보 가져오기 요청 */
export interface GetCustomerRequest {
  /** 거래처코드번호 */
  id: string;
}

/** 2-1. 거래처 정보 가져오기 결과 */
export interface GetCustomerResponse {
  status: number;
  result: GetCustomerResponse_Result | undefined;
  error: string[];
}

export interface GetCustomerResponse_Result {
  customer: Customer | undefined;
}

/** 3. 거래처 목록 가져오기 요청 */
export interface ListCustomerRequest {
  /** 페이지 번호 */
  page: number;
  /** 페이지 사이즈 */
  pagesize: number;
  /** 정렬 - field 명 */
  sort: string;
  /** 정렬 방식 asc / desc */
  order: string;
}

/** 3-1. 거래처 목록 가져오기 결과 */
export interface ListCustomerResponse {
  /** 상태 정보 */
  status: number;
  /** 전체 Customer 수 */
  totalCount: number;
  /** 페이지 번호 */
  page: number;
  /** 마지막 페이지 번호 */
  lastPage: number;
  /** 결과 정보 */
  result:
    | ListCustomerResponse_Result
    | undefined;
  /** 에러 정보 */
  error: string[];
}

export interface ListCustomerResponse_Result {
  /** Customer 목록 */
  customers: Customer[];
}

/** 4. 거래처 정보 수정 요청 */
export interface UpdateCustomerRequest {
  /** 거래처코드번호 */
  id: string;
  /** 거래처명 */
  name: string;
  /** 거래처설명 */
  description: string;
}

/** 4-1. 거래처 정보 수정 결과 */
export interface UpdateCustomerResponse {
  status: number;
  error: string[];
}

export interface Venue {
  /** 장소코드번호 */
  id: string;
  /** 거래처코드번호 */
  customerId: string;
  /** 종목코드번호 */
  sportsId: string;
  /** 국가코드번호 */
  countryId: number;
  /** 주코드번호 */
  stateId: number;
  /** 도시코드번호 */
  cityId: number;
  /** 장소명 */
  name: string;
  /** 장소설명 */
  description: string;
}

export interface GetVenueResponse {
  status: number;
  result: GetVenueResponse_Result | undefined;
  error: string[];
}

export interface GetVenueResponse_Result {
  venue: Venue | undefined;
}

export interface GetVenueRequest {
  /** 장소코드번호 */
  id: string;
}

export interface ListVenueResponse {
  status: number;
  totalCount: number;
  page: number;
  lastPage: number;
  result: ListVenueResponse_Result | undefined;
  error: string[];
}

export interface ListVenueResponse_Result {
  venues: Venue[];
}

export interface ListVenueRequest {
  /** 페이지 번호 */
  page: number;
  /** 페이지 사이즈 */
  pagesize: number;
  /** 정렬 - field 명 */
  sort: string;
  /** 정렬 방식 asc / desc */
  order: string;
}

export interface UpdateVenueResponse {
  status: number;
  error: string[];
}

export interface UpdateVenueRequest {
  /** 장소코드번호 */
  id: string;
  /** 거래처코드번호 */
  customerId: string;
  /** 종목코드번호 */
  sportsId: string;
  /** 국가코드번호 */
  countryId: number;
  /** 주코드번호 */
  stateId: number;
  /** 도시코드번호 */
  cityId: number;
  /** 장소명 */
  name: string;
  /** 장소설명 */
  description: string;
}

export interface DeleteVenueRequest {
  /** 장소코드번호 */
  id: string;
}

export interface DeleteVenueResponse {
  status: number;
  error: string[];
}

export interface CreateVenueRequest {
  /** 거래처코드번호 */
  customerId: string;
  /** 종목코드번호 */
  sportsId: string;
  /** 국가코드번호 */
  countryId: number;
  /** 주코드번호 */
  stateId: number;
  /** 도시코드번호 */
  cityId: number;
  /** 장소명 */
  name: string;
  /** 장소설명 */
  description: string;
}

export interface CreateVenueResponse {
  status: number;
  error: string[];
  result: CreateVenueResponse_Result | undefined;
}

export interface CreateVenueResponse_Result {
  id: string;
}

export interface UpdateSectorResponse {
  status: number;
  error: string[];
}

export interface UpdateSectorRequest {
  /** 구역코드번호 */
  id: string;
  /** 고객코드번호 */
  customerId: string;
  /** 장소코드번호 */
  venueId: string;
  /** 구역명 */
  name: string;
  /** 구역설명 */
  description: string;
}

export interface ListSectorResponse {
  status: number;
  totalCount: number;
  page: number;
  lastPage: number;
  result: ListSectorResponse_Result | undefined;
  error: string[];
}

export interface ListSectorResponse_Result {
  sectors: Sector[];
}

export interface ListSectorRequest {
  /** 페이지 번호 */
  page: number;
  /** 페이지 사이즈 */
  pagesize: number;
  /** 정렬 - field 명 */
  sort: string;
  /** 정렬 방식 asc / desc */
  order: string;
}

export interface GetSectorResponse {
  status: number;
  result: GetSectorResponse_Result | undefined;
  error: string[];
}

export interface GetSectorResponse_Result {
  sector: Sector2 | undefined;
}

export interface GetSectorRequest {
  /** sector id */
  id: string;
}

export interface DeleteSectorRequest {
  /** 구역코드번호 */
  id: string;
}

export interface DeleteSectorResponse {
  status: number;
  error: string[];
}

export interface Sector {
  /** 구역코드번호 */
  id: string;
  /** 고객코드번호 */
  customerId: string;
  /** 장소코드번호 */
  venueId: string;
  /** 구역명 */
  name: string;
  /** 구역설명 */
  description: string;
}

export interface Sector2 {
  /** 구역코드번호 */
  id: string;
  /** 고객코드번호 */
  customerId: string;
  /** 장소코드번호 */
  venueId: string;
  /** 구역명 */
  name: string;
  /** 구역설명 */
  description: string;
  /** 종목코드번호 */
  sportsId: string;
  /** 구장코드번호 */
  fId: string;
}

export interface CreateSectorRequest {
  /** 고객코드번호 */
  customerId: string;
  /** 장소코드번호 */
  venueId: string;
  /** 구역명 */
  name: string;
  /** 구역설명 */
  description: string;
}

export interface CreateSectorResponse {
  status: number;
  error: string[];
  result: CreateSectorResponse_Result | undefined;
}

export interface CreateSectorResponse_Result {
  id: string;
}

export interface CreateMemberRequest {
  name: string;
  email: string;
  password: string;
  roles: number;
}

export interface CreateMemberResponse {
  status: number;
  error: string[];
}

/** 카테고리 목록 요청 */
export interface ListCategoryReq {
  /** 페이지 번호 */
  page: number;
  /** 페이지 사이즈 */
  limit: number;
  /** 정렬 - field 명 */
  sort: string;
  /** 정렬 방식 asc / desc */
  order: string;
}

/** 카테고리 삭제 요청 */
export interface DeleteCategoryReq {
  /** 카테고리코드번호 */
  id: string;
}

/** 카테고리 삭제 응답 */
export interface DeleteCategoryRes {
  status: string;
  message: string;
}

/** 서브 카테고리 삭제 요청 */
export interface DeleteSubCategoryReq {
  /** 카테고리코드번호 */
  id: string;
}

/** 서브 카테고리 삭제 응답 */
export interface DeleteSubCategoryRes {
  status: string;
  message: string;
}

/** 서브 카테고리 정보 수정 응답 */
export interface UpdateSubCategoryRes {
  status: string;
  message: string;
}

/** 서브 카테고리 정보 수정 */
export interface UpdateSubCategoryReq {
  /** 카테고리 id */
  id: number;
  /** 상위 카테고리 코드 */
  categoryId: number;
  /** 카테고리명 */
  name: string;
  /** 카테고리 코드 */
  code: string;
  /** 카테고리설명 */
  description: string;
}

/** 카테고리 정보 수정 응답 */
export interface UpdateCategoryRes {
  status: string;
  message: string;
}

/** 카테고리 정보 수정 */
export interface UpdateCategoryReq {
  /** 카테고리 id */
  id: number;
  /** 카테고리명 */
  name: string;
  /** 카테고리 코드 */
  code: string;
  /** 카테고리설명 */
  description: string;
}

/** 서브 카테고리 상세 응답 */
export interface GetSubCategoryRes {
  status: string;
  message: string;
  data: GetSubCategoryRes_Data | undefined;
}

export interface GetSubCategoryRes_Data {
  subCategory?: CategorySubItem | undefined;
}

/** 카테고리 상세 응답 */
export interface GetCategoryRes {
  status: string;
  message: string;
  data: CategoryItem | undefined;
}

/** 서브 카테고리 목록 조회 */
export interface ListSubCategoryReq {
  /** 상위 카테고리 코드 */
  categoryId: string;
}

/** 서브 카테고리 목록 응답 */
export interface ListSubCategoryRes {
  status: string;
  message: string;
  category: CategorySubItem[];
  meta: Paging | undefined;
}

/** 카테고리 내용 */
export interface CategoryItem {
  /** 카테고리코드번호 */
  id: number;
  /** 카테고리명 */
  name: string;
  /** 카테고리 코드 */
  code: string;
  /** 카테고리설명 */
  description: string;
}

/** 서브 카테고리 내용 */
export interface CategorySubItem {
  /** 카테고리코드번호 */
  id: number;
  /** 상위 카테고리 코드 */
  categoryId: number;
  /** 카테고리명 */
  name: string;
  /** 카테고리 코드 */
  code: string;
  /** 카테고리설명 */
  description: string;
}

/** 서브 카테고리 등록 */
export interface CreateSubCategoryReq {
  /** 상위 카테고리 코드 */
  categoryId: number;
  /** 카테고리명 */
  name: string;
  /** 카테고리 코드 */
  code: string;
  /** 카테고리설명 */
  description: string;
}

/** 카테고리 등록 */
export interface CreateCategoryReq {
  /** 카테고리명 */
  name: string;
  /** 카테고리 코드 */
  code: string;
  /** 카테고리설명 */
  description: string;
}

/** 카테고리 등록 응답 */
export interface CreateCategoryRes {
  status: string;
  message: string;
}

/** 카테고리 목록 응답 */
export interface ListCategoryRes {
  status: string;
  message: string;
  data: CategoryItem[];
  meta: Paging | undefined;
}

/** 카테고리 상세 요청 */
export interface GetCategoryReq {
  /** 카테고리코드번호 */
  id: number;
}

/** 서브 카테고리 상세 요청 */
export interface GetSubCategoryReq {
  /** 서브 카테고리 코드 번호 */
  id: number;
}

export interface ListMwcRequest {
  path: string;
}

export interface AddHtmlRequest {
  filename: string;
}

export interface AddHtmlResponse {
  result: string;
  status: number;
  message: string;
}

export interface GetMwcRequest {
  index: number;
  filename: string;
}

export interface GetMwcResponse {
  status: string;
  message: string;
  data: Mwc | undefined;
}

export interface Mwc {
  index: number;
  video: string;
  thumbnail: string;
  download: string;
  link: string;
}

export interface ListMwcResponse {
  status: string;
  message: string;
  data: Mwc[];
}

export interface ListVersionResponse {
  result: string;
  status: number;
  message: string;
  data: ListVersionResponse_Data[];
}

export interface ListVersionResponse_Data {
  id: number;
  appName: string;
  version: string;
  description: string;
  platform: string;
  createAt: string;
}

export interface GetVersionResponse {
  result: string;
  status: number;
  message: string;
  data: GetVersionResponse_Data | undefined;
}

export interface GetVersionResponse_Data {
  id: number;
  appName: string;
  version: string;
  description: string;
  platform: string;
  createdAt: string;
}

export interface GetVersionRequest {
  id: number;
}

export interface AppVersionUpdateRequest {
  id: number;
  appName: string;
  version: string;
  description: string;
  platform: string;
  information: string;
}

export interface AppVersionUpdateResponse {
  result: string;
  status: number;
  message: string;
}

export interface AppVersionCreateRequest {
  appName: string;
  version: string;
  description: string;
  platform: string;
  information: string;
}

export interface AppVersionCreateResponse {
  result: string;
  status: number;
  message: string;
}

export interface ListShortSxResponse {
  result: string;
  status: number;
  message: string;
  data: ListShortSxResponse_Data[];
}

export interface ListShortSxResponse_Data {
  id: number;
  filename: string;
  filepath: string;
  returnapi: string;
}

export interface DeleteShortSxRequest {
  id: number;
}

export interface DeleteShortSxResponse {
  result: string;
  status: number;
  message: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  result: string;
  status: number;
  message: string;
  data: SignInResult[];
}

export interface SignInResult {
  id?: number | undefined;
  email?: string | undefined;
  name?: string | undefined;
  nickname?: string | undefined;
  usertype?: string | undefined;
  state?: string | undefined;
  token?: string | undefined;
  error?: string | undefined;
}

export interface GetUserRequest {
  id: number;
  authorization?: string | undefined;
}

export interface GetUserResponse {
  result: string;
  status: number;
  message: string;
  data: GetUserResult[];
}

export interface GetUserResult {
  id: number;
  email: string;
  name: string;
  nickname: string;
  usertype: string;
  state: string;
  isVerifiedEmail: boolean;
  pushreceive: boolean;
  emailreceive: boolean;
  date: { [key: string]: any } | undefined;
  channel: { [key: string]: any } | undefined;
  profile: { [key: string]: any } | undefined;
  videos: { [key: string]: any }[];
  socials: { [key: string]: any }[];
  notis: { [key: string]: any }[];
  error?: string | undefined;
}

export interface GetUsersRequest {
  page: number;
  limit: number;
  sort: string;
  order: string;
  keyword?: string | undefined;
  authorization?: string | undefined;
}

export interface GetUsersResult {
  id: number;
  email: string;
  password: string;
  name: string;
  nickname: string;
  usertype: string;
  pushreceive: boolean;
  emailreceive: boolean;
  state: string;
  isVerifiedEmail: boolean;
  date: { [key: string]: any } | undefined;
  channel: { [key: string]: any } | undefined;
  profile: { [key: string]: any } | undefined;
  videos: { [key: string]: any }[];
  socials: { [key: string]: any }[];
}

export interface GetUsersResponse {
  result: string;
  status: number;
  message: string;
  meta: Paging | undefined;
  data: GetUsersResult[];
}

export interface UpdateRequest {
  id: number;
  password?: string | undefined;
  name?: string | undefined;
  nickname?: string | undefined;
  usertype?: string | undefined;
  pushreceive?: boolean | undefined;
  emailreceive?: boolean | undefined;
  state?: string | undefined;
  isVerifiedEmail?: boolean | undefined;
  authorization?: string | undefined;
}

export interface UpdateResult {
  id: number;
  password?: string | undefined;
  name?: string | undefined;
  nickname?: string | undefined;
  usertype?: string | undefined;
  pushreceive?: boolean | undefined;
  emailreceive?: boolean | undefined;
  state?: string | undefined;
  isVerifiedEmail?: boolean | undefined;
}

export interface UpdateResponse {
  result: string;
  status: number;
  message: string;
  data: UpdateResult[];
}

export interface UpdateProfileRequest {
  id: number;
  gender?: string | undefined;
  photo?: string | undefined;
  authorization?: string | undefined;
}

export interface UpdateProfileResponse {
  result: string;
  status: number;
  message: string;
  data: UpdateProfileRequest[];
}

export interface UpdateChannelRequest {
  id: number;
  channelName?: string | undefined;
  description?: string | undefined;
  channelUrl?: string | undefined;
  link?: string | undefined;
  businessEmail?: string | undefined;
  authorization?: string | undefined;
}

export interface UpdateChannelResponse {
  result: string;
  status: number;
  message: string;
  data: UpdateChannelRequest[];
}

export interface UserUpdateVideoRequest {
  id?: number | undefined;
  email?: string | undefined;
  title?: string | undefined;
  subTitle?: string | undefined;
  description?: string | undefined;
  ownerName?: string | undefined;
  ownerNickName?: string | undefined;
  ownerChannelName?: string | undefined;
  ownerProfileIconUrl?: string | undefined;
  thumbnailUrl?: string | undefined;
  viewCount?: number | undefined;
  reportCount?: number | undefined;
  likesCount?: number | undefined;
  duration?: string | undefined;
  category?: string | undefined;
  categorySub?: string | undefined;
  categorySubCode?: string | undefined;
  recordType?: string | undefined;
  nodeId?: string | undefined;
  createdAt?: string | undefined;
  isPublic?: boolean | undefined;
  isStatus?: boolean | undefined;
  isDeleted?: boolean | undefined;
  userId: number;
  authorization?: string | undefined;
}

export interface UserVideoResponse {
  result: string;
  status: number;
  message: string;
  data: { [key: string]: any } | undefined;
}

export interface UserDeleteVideoRequest {
  authorization?: string | undefined;
  userid: number;
  videoid: number;
}

export interface UpdateSocialRequest {
  authorization?: string | undefined;
  targetId: number;
  id: number;
  providerId: string;
}

export interface UpdateSocialResponse {
  result: string;
  status: number;
  message: string;
  data: { [key: string]: any } | undefined;
}

export interface GetCommonCodeRequest {
  authorization?: string | undefined;
  groupCode: string;
  code: string;
}

export interface GetCommonCodeResponse {
  id: number;
  groupCode: string;
  code: string;
  name: string;
  isDeleted: boolean;
  detail?: { [key: string]: any } | undefined;
}

export interface CommonCodeResponse {
  result: string;
  status: number;
  message: string;
  error?: string | undefined;
  data: GetCommonCodeResponse[];
}

export interface GetCommonCodesRequest {
  authorization?: string | undefined;
}

export interface PutCommonCodeRequest {
  authorization?: string | undefined;
  groupCode: string;
  code: string;
  name: string;
  sort?: number | undefined;
  kr?: string | undefined;
  en?: string | undefined;
  jp?: string | undefined;
  ctkd?: string | undefined;
}

export interface ModCommonCodeRequest {
  authorization?: string | undefined;
  groupCode: string;
  code: string;
  newCode: string;
  newName: string;
  detailId?: number | undefined;
  sort?: number | undefined;
  kr?: string | undefined;
  en?: string | undefined;
  jp?: string | undefined;
  ctkd?: string | undefined;
}

export interface GetItemDetailRequest {
  authorization?: string | undefined;
}

export interface GetItemDetailResponse {
  result: string;
  status: number;
  message: string;
  error?: string | undefined;
  data: GetItemDetail[];
}

export interface GetItemDetail {
  groupCode: string;
  code: string;
  name: string;
  ctkd: string;
}

export interface GetReportsRequest {
  page: number;
  limit: number;
  sort: string;
  order: string;
  type?: string | undefined;
  keyword?: string | undefined;
  authorization?: string | undefined;
}

export interface GetReportRequest {
  id: number;
  authorization?: string | undefined;
}

export interface GetReportsResponse {
  result: string;
  status: number;
  message: string;
  meta: Paging | undefined;
  data: { [key: string]: any }[];
}

export interface GetDashBoardAllRequest {
  authorization?: string | undefined;
}

export interface GetDashBoardAllResponse {
  result: string;
  status: number;
  message: string;
  data: { [key: string]: any }[];
}

export const BACKOFFICE_PACKAGE_NAME = "backoffice";

wrappers[".google.protobuf.Struct"] = { fromObject: Struct.wrap, toObject: Struct.unwrap } as any;

/**
 * ******************************************************************************
 * 비디오 관련 시작
 * *******************************************************************************
 */

export interface VideoServiceClient {
  createVideo(request: CreateVideoRequest): Observable<CreateVideoResponse>;

  /**
   * rpc GetVideo(GetVideoRequest) returns (GetVideoResponse) {} // 비디오 정보 입력
   *  rpc ListVideo(ListVideoRequest) returns (ListVideoResponse) {} // 비디오 정보 입력
   *  rpc UpdateVideo(UpdateVideoRequest) returns (UpdateVideoResponse) {} // 비디오 정보 입력
   *  rpc DeleteVideo(DeleteVideoRequest) returns (DeleteVideoResponse) {} // 비디오 정보 입력
   * 임시...
   */

  v1CreateVideo(request: V1CreateVideoRequest): Observable<V1CreateVideoResponse>;

  v1GetVideo(request: V1GetVideoRequest): Observable<V1GetVideoResponse>;

  v1ListVideo(request: V1ListVideoRequest): Observable<V1ListVideoResponse>;

  v1DeleteVideo(request: V1DeleteVideoRequest): Observable<V1DeleteVideoResponse>;
}

/**
 * ******************************************************************************
 * 비디오 관련 시작
 * *******************************************************************************
 */

export interface VideoServiceController {
  createVideo(
    request: CreateVideoRequest,
  ): Promise<CreateVideoResponse> | Observable<CreateVideoResponse> | CreateVideoResponse;

  /**
   * rpc GetVideo(GetVideoRequest) returns (GetVideoResponse) {} // 비디오 정보 입력
   *  rpc ListVideo(ListVideoRequest) returns (ListVideoResponse) {} // 비디오 정보 입력
   *  rpc UpdateVideo(UpdateVideoRequest) returns (UpdateVideoResponse) {} // 비디오 정보 입력
   *  rpc DeleteVideo(DeleteVideoRequest) returns (DeleteVideoResponse) {} // 비디오 정보 입력
   * 임시...
   */

  v1CreateVideo(
    request: V1CreateVideoRequest,
  ): Promise<V1CreateVideoResponse> | Observable<V1CreateVideoResponse> | V1CreateVideoResponse;

  v1GetVideo(
    request: V1GetVideoRequest,
  ): Promise<V1GetVideoResponse> | Observable<V1GetVideoResponse> | V1GetVideoResponse;

  v1ListVideo(
    request: V1ListVideoRequest,
  ): Promise<V1ListVideoResponse> | Observable<V1ListVideoResponse> | V1ListVideoResponse;

  v1DeleteVideo(
    request: V1DeleteVideoRequest,
  ): Promise<V1DeleteVideoResponse> | Observable<V1DeleteVideoResponse> | V1DeleteVideoResponse;
}

export function VideoServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createVideo", "v1CreateVideo", "v1GetVideo", "v1ListVideo", "v1DeleteVideo"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("VideoService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("VideoService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const VIDEO_SERVICE_NAME = "VideoService";

/**
 * ******************************************************************************
 * 거래처 관련 시작
 * ******************************************************************************
 */

export interface BO_Customer_ServiceClient {
  createCustomer(request: CreateCustomerRequest): Observable<CreateCustomerResponse>;

  updateCustomer(request: UpdateCustomerRequest): Observable<UpdateCustomerResponse>;

  deleteCustomer(request: DeleteCustomerRequest): Observable<DeleteCustomerResponse>;

  getCustomer(request: GetCustomerRequest): Observable<GetCustomerResponse>;

  listCustomer(request: ListCustomerRequest): Observable<ListCustomerResponse>;

  makeQrCode(request: MakeQRCodeRequest): Observable<MakeQRCodeResponse>;
}

/**
 * ******************************************************************************
 * 거래처 관련 시작
 * ******************************************************************************
 */

export interface BO_Customer_ServiceController {
  createCustomer(
    request: CreateCustomerRequest,
  ): Promise<CreateCustomerResponse> | Observable<CreateCustomerResponse> | CreateCustomerResponse;

  updateCustomer(
    request: UpdateCustomerRequest,
  ): Promise<UpdateCustomerResponse> | Observable<UpdateCustomerResponse> | UpdateCustomerResponse;

  deleteCustomer(
    request: DeleteCustomerRequest,
  ): Promise<DeleteCustomerResponse> | Observable<DeleteCustomerResponse> | DeleteCustomerResponse;

  getCustomer(
    request: GetCustomerRequest,
  ): Promise<GetCustomerResponse> | Observable<GetCustomerResponse> | GetCustomerResponse;

  listCustomer(
    request: ListCustomerRequest,
  ): Promise<ListCustomerResponse> | Observable<ListCustomerResponse> | ListCustomerResponse;

  makeQrCode(
    request: MakeQRCodeRequest,
  ): Promise<MakeQRCodeResponse> | Observable<MakeQRCodeResponse> | MakeQRCodeResponse;
}

export function BO_Customer_ServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createCustomer",
      "updateCustomer",
      "deleteCustomer",
      "getCustomer",
      "listCustomer",
      "makeQrCode",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BO_Customer_Service", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BO_Customer_Service", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const B_O__CUSTOMER__SERVICE_NAME = "BO_Customer_Service";

/**
 * ******************************************************************************
 * 거래처 소속 - 베뉴 정보 시작
 * ******************************************************************************
 */

export interface BO_Venue_ServiceClient {
  createVenue(request: CreateVenueRequest): Observable<CreateVenueResponse>;

  getVenue(request: GetVenueRequest): Observable<GetVenueResponse>;

  listVenue(request: ListVenueRequest): Observable<ListVenueResponse>;

  updateVenue(request: UpdateVenueRequest): Observable<UpdateVenueResponse>;

  deleteVenue(request: DeleteVenueRequest): Observable<DeleteVenueResponse>;
}

/**
 * ******************************************************************************
 * 거래처 소속 - 베뉴 정보 시작
 * ******************************************************************************
 */

export interface BO_Venue_ServiceController {
  createVenue(
    request: CreateVenueRequest,
  ): Promise<CreateVenueResponse> | Observable<CreateVenueResponse> | CreateVenueResponse;

  getVenue(request: GetVenueRequest): Promise<GetVenueResponse> | Observable<GetVenueResponse> | GetVenueResponse;

  listVenue(request: ListVenueRequest): Promise<ListVenueResponse> | Observable<ListVenueResponse> | ListVenueResponse;

  updateVenue(
    request: UpdateVenueRequest,
  ): Promise<UpdateVenueResponse> | Observable<UpdateVenueResponse> | UpdateVenueResponse;

  deleteVenue(
    request: DeleteVenueRequest,
  ): Promise<DeleteVenueResponse> | Observable<DeleteVenueResponse> | DeleteVenueResponse;
}

export function BO_Venue_ServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createVenue", "getVenue", "listVenue", "updateVenue", "deleteVenue"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BO_Venue_Service", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BO_Venue_Service", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const B_O__VENUE__SERVICE_NAME = "BO_Venue_Service";

/**
 * ******************************************************************************
 * customer - venue - sector
 * ******************************************************************************
 */

export interface BO_Sector_ServiceClient {
  createSector(request: CreateSectorRequest): Observable<CreateSectorResponse>;

  getSector(request: GetSectorRequest): Observable<GetSectorResponse>;

  listSector(request: ListSectorRequest): Observable<ListSectorResponse>;

  updateSector(request: UpdateSectorRequest): Observable<UpdateSectorResponse>;

  deleteSector(request: DeleteSectorRequest): Observable<DeleteSectorResponse>;
}

/**
 * ******************************************************************************
 * customer - venue - sector
 * ******************************************************************************
 */

export interface BO_Sector_ServiceController {
  createSector(
    request: CreateSectorRequest,
  ): Promise<CreateSectorResponse> | Observable<CreateSectorResponse> | CreateSectorResponse;

  getSector(request: GetSectorRequest): Promise<GetSectorResponse> | Observable<GetSectorResponse> | GetSectorResponse;

  listSector(
    request: ListSectorRequest,
  ): Promise<ListSectorResponse> | Observable<ListSectorResponse> | ListSectorResponse;

  updateSector(
    request: UpdateSectorRequest,
  ): Promise<UpdateSectorResponse> | Observable<UpdateSectorResponse> | UpdateSectorResponse;

  deleteSector(
    request: DeleteSectorRequest,
  ): Promise<DeleteSectorResponse> | Observable<DeleteSectorResponse> | DeleteSectorResponse;
}

export function BO_Sector_ServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createSector", "getSector", "listSector", "updateSector", "deleteSector"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BO_Sector_Service", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BO_Sector_Service", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const B_O__SECTOR__SERVICE_NAME = "BO_Sector_Service";

/**
 * ******************************************************************************
 * customer - member
 * ******************************************************************************
 */

export interface BO_Member_ServiceClient {
  createMember(request: CreateMemberRequest): Observable<CreateMemberResponse>;
}

/**
 * ******************************************************************************
 * customer - member
 * ******************************************************************************
 */

export interface BO_Member_ServiceController {
  createMember(
    request: CreateMemberRequest,
  ): Promise<CreateMemberResponse> | Observable<CreateMemberResponse> | CreateMemberResponse;
}

export function BO_Member_ServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createMember"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BO_Member_Service", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BO_Member_Service", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const B_O__MEMBER__SERVICE_NAME = "BO_Member_Service";

/**
 * ******************************************************************************
 * 카테고리 관리 시작
 * *******************************************************************************
 */

export interface CategoryServiceClient {
  createCategory(request: CreateCategoryReq): Observable<CreateCategoryRes>;

  createSubCategory(request: CreateSubCategoryReq): Observable<CreateCategoryRes>;

  listCategory(request: ListCategoryReq): Observable<ListCategoryRes>;

  listSubCategory(request: ListSubCategoryReq): Observable<ListSubCategoryRes>;

  getCategory(request: GetCategoryReq): Observable<GetCategoryRes>;

  getSubCategory(request: GetSubCategoryReq): Observable<GetSubCategoryRes>;

  updateCategory(request: UpdateCategoryReq): Observable<UpdateCategoryRes>;

  updateSubCategory(request: UpdateSubCategoryReq): Observable<UpdateSubCategoryRes>;

  deleteCategory(request: DeleteCategoryReq): Observable<DeleteCategoryRes>;

  deleteSubCategory(request: DeleteSubCategoryReq): Observable<DeleteSubCategoryRes>;
}

/**
 * ******************************************************************************
 * 카테고리 관리 시작
 * *******************************************************************************
 */

export interface CategoryServiceController {
  createCategory(
    request: CreateCategoryReq,
  ): Promise<CreateCategoryRes> | Observable<CreateCategoryRes> | CreateCategoryRes;

  createSubCategory(
    request: CreateSubCategoryReq,
  ): Promise<CreateCategoryRes> | Observable<CreateCategoryRes> | CreateCategoryRes;

  listCategory(request: ListCategoryReq): Promise<ListCategoryRes> | Observable<ListCategoryRes> | ListCategoryRes;

  listSubCategory(
    request: ListSubCategoryReq,
  ): Promise<ListSubCategoryRes> | Observable<ListSubCategoryRes> | ListSubCategoryRes;

  getCategory(request: GetCategoryReq): Promise<GetCategoryRes> | Observable<GetCategoryRes> | GetCategoryRes;

  getSubCategory(
    request: GetSubCategoryReq,
  ): Promise<GetSubCategoryRes> | Observable<GetSubCategoryRes> | GetSubCategoryRes;

  updateCategory(
    request: UpdateCategoryReq,
  ): Promise<UpdateCategoryRes> | Observable<UpdateCategoryRes> | UpdateCategoryRes;

  updateSubCategory(
    request: UpdateSubCategoryReq,
  ): Promise<UpdateSubCategoryRes> | Observable<UpdateSubCategoryRes> | UpdateSubCategoryRes;

  deleteCategory(
    request: DeleteCategoryReq,
  ): Promise<DeleteCategoryRes> | Observable<DeleteCategoryRes> | DeleteCategoryRes;

  deleteSubCategory(
    request: DeleteSubCategoryReq,
  ): Promise<DeleteSubCategoryRes> | Observable<DeleteSubCategoryRes> | DeleteSubCategoryRes;
}

export function CategoryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createCategory",
      "createSubCategory",
      "listCategory",
      "listSubCategory",
      "getCategory",
      "getSubCategory",
      "updateCategory",
      "updateSubCategory",
      "deleteCategory",
      "deleteSubCategory",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CategoryService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CategoryService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CATEGORY_SERVICE_NAME = "CategoryService";

/**
 * ******************************************************************************
 * MWC 용
 * *******************************************************************************
 */

export interface MwcServiceClient {
  listMwc(request: Empty): Observable<ListMwcResponse>;

  listMwcPath(request: ListMwcRequest): Observable<ListMwcResponse>;

  getMwc(request: GetMwcRequest): Observable<GetMwcResponse>;

  addHtml(request: AddHtmlRequest): Observable<AddHtmlResponse>;
}

/**
 * ******************************************************************************
 * MWC 용
 * *******************************************************************************
 */

export interface MwcServiceController {
  listMwc(request: Empty): Promise<ListMwcResponse> | Observable<ListMwcResponse> | ListMwcResponse;

  listMwcPath(request: ListMwcRequest): Promise<ListMwcResponse> | Observable<ListMwcResponse> | ListMwcResponse;

  getMwc(request: GetMwcRequest): Promise<GetMwcResponse> | Observable<GetMwcResponse> | GetMwcResponse;

  addHtml(request: AddHtmlRequest): Promise<AddHtmlResponse> | Observable<AddHtmlResponse> | AddHtmlResponse;
}

export function MwcServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["listMwc", "listMwcPath", "getMwc", "addHtml"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("MwcService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("MwcService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const MWC_SERVICE_NAME = "MwcService";

/**
 * ******************************************************************************
 * app Versioning
 * *******************************************************************************
 */

export interface AppVersionServiceClient {
  listVersion(request: Empty): Observable<ListVersionResponse>;

  getVersion(request: Empty): Observable<GetVersionResponse>;

  createVersion(request: AppVersionCreateRequest): Observable<AppVersionCreateResponse>;

  updateVersion(request: AppVersionUpdateRequest): Observable<AppVersionUpdateResponse>;

  getAndroidVersion(request: Empty): Observable<GetVersionResponse>;

  getIosVersion(request: Empty): Observable<GetVersionResponse>;
}

/**
 * ******************************************************************************
 * app Versioning
 * *******************************************************************************
 */

export interface AppVersionServiceController {
  listVersion(request: Empty): Promise<ListVersionResponse> | Observable<ListVersionResponse> | ListVersionResponse;

  getVersion(request: Empty): Promise<GetVersionResponse> | Observable<GetVersionResponse> | GetVersionResponse;

  createVersion(
    request: AppVersionCreateRequest,
  ): Promise<AppVersionCreateResponse> | Observable<AppVersionCreateResponse> | AppVersionCreateResponse;

  updateVersion(
    request: AppVersionUpdateRequest,
  ): Promise<AppVersionUpdateResponse> | Observable<AppVersionUpdateResponse> | AppVersionUpdateResponse;

  getAndroidVersion(request: Empty): Promise<GetVersionResponse> | Observable<GetVersionResponse> | GetVersionResponse;

  getIosVersion(request: Empty): Promise<GetVersionResponse> | Observable<GetVersionResponse> | GetVersionResponse;
}

export function AppVersionServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "listVersion",
      "getVersion",
      "createVersion",
      "updateVersion",
      "getAndroidVersion",
      "getIosVersion",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AppVersionService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AppVersionService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const APP_VERSION_SERVICE_NAME = "AppVersionService";

export interface Backoffice_ShortsX_ServiceClient {
  listShortSx(request: Empty): Observable<ListShortSxResponse>;

  deleteShortSx(request: DeleteShortSxRequest): Observable<DeleteShortSxResponse>;
}

export interface Backoffice_ShortsX_ServiceController {
  listShortSx(request: Empty): Promise<ListShortSxResponse> | Observable<ListShortSxResponse> | ListShortSxResponse;

  deleteShortSx(
    request: DeleteShortSxRequest,
  ): Promise<DeleteShortSxResponse> | Observable<DeleteShortSxResponse> | DeleteShortSxResponse;
}

export function Backoffice_ShortsX_ServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["listShortSx", "deleteShortSx"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("Backoffice_ShortsX_Service", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("Backoffice_ShortsX_Service", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BACKOFFICE__SHORTS_X__SERVICE_NAME = "Backoffice_ShortsX_Service";

/**
 * ******************************************************************************
 * Auth 서비스
 * *******************************************************************************
 */

export interface AuthServiceClient {
  signIn(request: SignInRequest): Observable<SignInResponse>;
}

/**
 * ******************************************************************************
 * Auth 서비스
 * *******************************************************************************
 */

export interface AuthServiceController {
  signIn(request: SignInRequest): Promise<SignInResponse> | Observable<SignInResponse> | SignInResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["signIn"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";

/**
 * ******************************************************************************
 * Account 서비스
 * *******************************************************************************
 */

export interface AccountServiceClient {
  getUsers(request: GetUsersRequest): Observable<GetUsersResponse>;

  getUser(request: GetUserRequest): Observable<GetUserResponse>;

  updateUser(request: UpdateRequest): Observable<UpdateResponse>;

  deleteUser(request: GetUserRequest): Observable<UpdateResponse>;

  updateProfile(request: UpdateProfileRequest): Observable<UpdateProfileResponse>;

  updateChannel(request: UpdateChannelRequest): Observable<UpdateChannelResponse>;

  updateVideo(request: UserUpdateVideoRequest): Observable<UserVideoResponse>;

  deleteVideo(request: UserDeleteVideoRequest): Observable<UserVideoResponse>;

  updateSocial(request: UpdateSocialRequest): Observable<UpdateSocialResponse>;
}

/**
 * ******************************************************************************
 * Account 서비스
 * *******************************************************************************
 */

export interface AccountServiceController {
  getUsers(request: GetUsersRequest): Promise<GetUsersResponse> | Observable<GetUsersResponse> | GetUsersResponse;

  getUser(request: GetUserRequest): Promise<GetUserResponse> | Observable<GetUserResponse> | GetUserResponse;

  updateUser(request: UpdateRequest): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  deleteUser(request: GetUserRequest): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  updateProfile(
    request: UpdateProfileRequest,
  ): Promise<UpdateProfileResponse> | Observable<UpdateProfileResponse> | UpdateProfileResponse;

  updateChannel(
    request: UpdateChannelRequest,
  ): Promise<UpdateChannelResponse> | Observable<UpdateChannelResponse> | UpdateChannelResponse;

  updateVideo(
    request: UserUpdateVideoRequest,
  ): Promise<UserVideoResponse> | Observable<UserVideoResponse> | UserVideoResponse;

  deleteVideo(
    request: UserDeleteVideoRequest,
  ): Promise<UserVideoResponse> | Observable<UserVideoResponse> | UserVideoResponse;

  updateSocial(
    request: UpdateSocialRequest,
  ): Promise<UpdateSocialResponse> | Observable<UpdateSocialResponse> | UpdateSocialResponse;
}

export function AccountServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getUsers",
      "getUser",
      "updateUser",
      "deleteUser",
      "updateProfile",
      "updateChannel",
      "updateVideo",
      "deleteVideo",
      "updateSocial",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AccountService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AccountService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ACCOUNT_SERVICE_NAME = "AccountService";

/**
 * ******************************************************************************
 * CommonCode 서비스
 * *******************************************************************************
 */

export interface CommonCodeServiceClient {
  getCommonCodes(request: GetCommonCodesRequest): Observable<CommonCodeResponse>;

  getCommonCode(request: GetCommonCodeRequest): Observable<CommonCodeResponse>;

  putCommonCode(request: PutCommonCodeRequest): Observable<CommonCodeResponse>;

  delCommonCode(request: GetCommonCodeRequest): Observable<CommonCodeResponse>;

  modCommonCode(request: ModCommonCodeRequest): Observable<CommonCodeResponse>;

  getDetailCode(request: GetItemDetailRequest): Observable<GetItemDetailResponse>;
}

/**
 * ******************************************************************************
 * CommonCode 서비스
 * *******************************************************************************
 */

export interface CommonCodeServiceController {
  getCommonCodes(
    request: GetCommonCodesRequest,
  ): Promise<CommonCodeResponse> | Observable<CommonCodeResponse> | CommonCodeResponse;

  getCommonCode(
    request: GetCommonCodeRequest,
  ): Promise<CommonCodeResponse> | Observable<CommonCodeResponse> | CommonCodeResponse;

  putCommonCode(
    request: PutCommonCodeRequest,
  ): Promise<CommonCodeResponse> | Observable<CommonCodeResponse> | CommonCodeResponse;

  delCommonCode(
    request: GetCommonCodeRequest,
  ): Promise<CommonCodeResponse> | Observable<CommonCodeResponse> | CommonCodeResponse;

  modCommonCode(
    request: ModCommonCodeRequest,
  ): Promise<CommonCodeResponse> | Observable<CommonCodeResponse> | CommonCodeResponse;

  getDetailCode(
    request: GetItemDetailRequest,
  ): Promise<GetItemDetailResponse> | Observable<GetItemDetailResponse> | GetItemDetailResponse;
}

export function CommonCodeServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getCommonCodes",
      "getCommonCode",
      "putCommonCode",
      "delCommonCode",
      "modCommonCode",
      "getDetailCode",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CommonCodeService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CommonCodeService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const COMMON_CODE_SERVICE_NAME = "CommonCodeService";

/**
 * ******************************************************************************
 * Report 서비스
 * *******************************************************************************
 */

export interface ReportServiceClient {
  getReports(request: GetReportsRequest): Observable<GetReportsResponse>;

  getReport(request: GetReportRequest): Observable<GetReportsResponse>;
}

/**
 * ******************************************************************************
 * Report 서비스
 * *******************************************************************************
 */

export interface ReportServiceController {
  getReports(
    request: GetReportsRequest,
  ): Promise<GetReportsResponse> | Observable<GetReportsResponse> | GetReportsResponse;

  getReport(
    request: GetReportRequest,
  ): Promise<GetReportsResponse> | Observable<GetReportsResponse> | GetReportsResponse;
}

export function ReportServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getReports", "getReport"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ReportService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ReportService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const REPORT_SERVICE_NAME = "ReportService";

/**
 * ******************************************************************************
 * Dashboard 서비스
 * *******************************************************************************
 */

export interface DashBoardServiceClient {
  getDashBoardAll(request: GetDashBoardAllRequest): Observable<GetDashBoardAllResponse>;
}

/**
 * ******************************************************************************
 * Dashboard 서비스
 * *******************************************************************************
 */

export interface DashBoardServiceController {
  getDashBoardAll(
    request: GetDashBoardAllRequest,
  ): Promise<GetDashBoardAllResponse> | Observable<GetDashBoardAllResponse> | GetDashBoardAllResponse;
}

export function DashBoardServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getDashBoardAll"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("DashBoardService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("DashBoardService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const DASH_BOARD_SERVICE_NAME = "DashBoardService";
