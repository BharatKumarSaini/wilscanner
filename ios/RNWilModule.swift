//
//  RNWilModule.swift
//  RNWilModule
//
//  Copyright © 2022 Bharat Saini. All rights reserved.
//

import Foundation

@objc(RNWilModule)
class RNWilModule: NSObject {
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["count": 1]
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
