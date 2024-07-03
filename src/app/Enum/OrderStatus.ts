export enum OrderStatus {
  New = 1,
  AcceptedByDeliveryCompany,
  RejectedByDeliveryCompany,
  Pending,
  DeliveredToDeliveryMan,
  CanNotBeReached,
  Postponed,
  PartiallyDelivered,
  CanceledByCustomer,
  RejectWithPayment,
  RejectWithoutPayment,
  RejectWithPartiallyPaid,
}
