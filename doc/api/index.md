

## 自动外呼

| API                                                                                      | 说明        | 更新说明 |
| ---------------------------------------------------------------------------------------- | ---------- | -------- |
| 1. [API鉴权](https://github.com/nxtele/http-api-document/wiki/Callbot-API-authorization)                        | 访问接口的鉴权方式 | 
| 2. [创建自动拨号任务](https://github.com/nxtele/http-api-document/wiki/Callbot-API-createTask)               | 创建自动拨号任务 |
| 3. [批量添加拨打名单](https://github.com/nxtele/http-api-document/wiki/Callbot-API-addBatchOrder)               | 配合创建自动拨号任务使用 |
| 4. [创建自动拨号任务并添加拨打名单](https://github.com/nxtele/http-api-document/wiki/Callbot-API-createTaskAndCall) | 同时创建任务和导入订单 |
| 5. [任务控制](https://github.com/nxtele/http-api-document/wiki/Callbot-API-mgrTaskStatus)                       | 开始、暂停和结束任务 |
| 6. [任务更新](https://github.com/nxtele/http-api-document/wiki/Callbot-API-updateTask)                       | 更新任务的配置 |
| 7. [任务列表](https://github.com/nxtele/http-api-document/wiki/Callbot-API-taskList)                       | 获取任务列表 |
| 8. [获取通话列表](https://github.com/nxtele/http-api-document/wiki/Callbot-API-callList)                   | 通话维度，一个订单可能有多个通话 |
| 9. [获取拨打订单列表](https://github.com/nxtele/http-api-document/wiki/Callbot-API-orderList)               | 订单维度，只返回订单的最后一个通话 |
| 10. [停止订单拨打](https://github.com/nxtele/http-api-document/wiki/Callbot-API-stopOrder)                  | 可以停止还未拨打的通话 |
| 11. [查询订单维度拨打详情](https://github.com/nxtele/http-api-document/wiki/Callbot-API-orderDetailList)          | 提供订单ID,查询订单内的所有通话 |
| 12. [批量导出名单](https://github.com/nxtele/http-api-document/wiki/Callbot-API-batchExportCall)         | 获取最新批次的所有通话数据 |
| 13. [批量导入名单](https://github.com/nxtele/http-api-document/wiki/Callbot-API-batchImportCall)         | 导入订单，但是带有批次的逻辑，会对上一批次的订单进行处理 |
| 14. [通话维度回调](https://github.com/nxtele/http-api-document/wiki/Callbot-API-callCallback)                  | 通话结束后进行回调 |
| 15. [订单维度回调](https://github.com/nxtele/http-api-document/wiki/Callbot-API-orderCallback)                  | 订单完成后进行回调 |
| 16. [任务状态回调](https://github.com/nxtele/http-api-document/wiki/Callbot-API-taskCallback)                  | 任务的状态发生变更后进行回调 |

## 人工坐席

| API                                                                                        | 说明                              |  更新说明 |
| ------------------------------------------------------------------------------------------ | -------------------------------- | -------- |
| 17. [手动拨号通话记录查询](https://github.com/nxtele/http-api-document/wiki/NXCC-API-cdrQuery) | 查询通话记录  |
| 18. [通过订单ID查询](https://github.com/nxtele/http-api-document/wiki/NXCC-API-cdrQueryByOrder)       | 可通过orderId查询通话记录  |
| 19. [手动拨号记录回调](https://github.com/nxtele/http-api-document/wiki/NXCC-API-webhook)     | 根据配置的地址进行回调  |
| 20. [坐席信息查询](https://github.com/nxtele/http-api-document/wiki/NXCC-API-agentInfo)         | 查询坐席信息  |
| 21. [坐席状态查询](https://github.com/nxtele/http-api-document/wiki/NXCC-API-agentStatus)         | 查询坐席的状态  |
| 22. [坐席组查询](https://github.com/nxtele/http-api-document/wiki/NXCC-API-groupQuery)           | 查询坐席组的信息  |
| 23. [坐席组成员查询](https://github.com/nxtele/http-api-document/wiki/NXCC-API-queueAgents)       | 查询坐席组的成员  |
| 24. [坐席组更新成员](https://github.com/nxtele/http-api-document/wiki/NXCC-API-queueAgentsUpdate)       | 坐席组更新成员  |
| 25. [坐席效率统计](https://github.com/nxtele/http-api-document/wiki/NXCC-API-agentEfficiencyStatistics)         | 查询坐席效率统计  |
| 26. [创建AICC外呼任务](https://github.com/nxtele/http-api-document/wiki/NXCC-API-createAutoCallTask)     | 创建AICC外呼任务  |

## 补充说明

### 9.获取拨打订单列表 
任务导入的一个号码 = 一个订单，订单可能根据拨打策略进行重复拨打，一个订单ID可能产生多次拨打。

### 13.批次-导入最新批次数据
每次调用该接口都会产生一个新的批次号，号码列入最新批次中，对上一个批次的号码如果已经拨打则保留，如果还没拨打，怎么进行删除。