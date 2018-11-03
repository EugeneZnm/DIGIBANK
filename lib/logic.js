/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * // @ param decorator linking transaction to javascript function
 * @param {digibank.AccountTransfer} sampleTransaction
 * @transaction
 */

function accountTransfer(accountTransfer){
    // validating if account with funds has enough money
if (accountTransfer.from.balance < accountTransfer.to.balance) {
    // erroe in case of insufficient funds
throw new Error ("Insufficient funds");
}

// addition and subtraction operations on accout balance
accountTransfer.from.balance -= accountTransfer.amount;
accountTransfer.to.balance += accountTransfer.amount;

// updating transaction on blockchain by calling getAssetResgistry API
return getAssetRegistry('test.Account')
.then (function(assetRegistry) {
    // update retrieved asset registry for sender account
return assetRegistry.update(accountTransfer.from)    
})

.then(function(){
    // update asset registry for recipient account
return getAssetRegistry('test.Account');    
})

.then(function (assetRegistry){
return assetRegistry.update(accountTransfer.to);    
});

}
