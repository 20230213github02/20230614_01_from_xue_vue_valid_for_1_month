

<template>
  <div class="xinguiding">
    <h2 class="xingui">個人情報申請</h2>
    <table>
      <tr>
        <td>申請情報登録日</td>
      
        <input type="text" v-model="now" disabled>
      </tr>
      <tr>
        <td>申請者名</td>
        <td>
          <input type="text" v-model="aPLShinseisyaName" @blur="checkNameValidity">
          <span class="error-message" v-if="isNameInvalid">0〜15文字で入力してください</span>
        </td>
       </tr>
      <tr>
        <td>住所</td>
        <td>
          <div class="address-input">
            <span class="input-label">郵便番号〒</span>
          
            <div class="postal-code-input">
              <input type="text" v-model="aPLAddressYubinNo3" pattern="[0-9]{3}" title="请输入郵便番号的前3位" ref="postalCodeFirstInput"  maxlength="3" @blur="checkPostalCodeValidity">
              <span>-</span>
              <input type="text" v-model="aPLAddressYubinNo4" pattern="[0-9]{4}" title="请输入郵便番号的后4位" ref="postalCodeSecondInput" maxlength="4" @blur="checkPostalCodeValidity">
              <button @click="fetchAddress">地址自動入力</button>
              <span class="error-message" v-if="isPostalCodeFirstInvalid || isPostalCodeSecondInvalid">正しい郵便番号を入力してください</span>

          </div>  


          </div>
          <div>
            <span class="input-label">都道府県</span>
            <select v-model="aPLAddressTodofuken">
              <option disabled value="">都道府県を選択してください</option>
             
            </select>
   
          </div>
          <div>
            <span class="input-label">市区町村</span>
            <input type="text" v-model="aPLAddressShikuchoson">
          </div>
          <div>
            <span class="input-label">字・番地等</span>
            <input type="text" v-model="aPLAddressBanchi">
          </div>
          
          <div>
  <span class="input-label">マンション名等</span>
  <input type="text" v-model="aPLAddressManshon" @input="checkBuildingValidity">
  <span class="error-message" v-if="isBuildingInvalid">255文字以内のマンション名等を入力してください</span>
</div>
<div>
      <span class="input-label">都道府県カナ</span>
      <input type="text" v-model="aPLAddressTodofukenKana" @input="checkTodofukenKanaValidity">
      <span class="error-message" v-if="isTodofukenKanaInvalid">50文字以内の都道府県カナを入力してください</span>
    </div>
    <div>
      <span class="input-label">市区町村カナ</span>
      <input type="text" v-model="aPLAddressShikuchosonKana"  @input="checkShikuchosonKanaValidity">
      <span class="error-message" v-if="isShikuchosonKanaInvalid">255文字以内の市区町村カナを入力してください</span>
    </div>
    <div>
      <span class="input-label">字・番地等カナ</span>
      <input type="text" v-model="aPLAddressBanchiKana"  @input="checkBanchiKanaValidity" >
      <span class="error-message" v-if="isBanchiKanaInvalid">255文字以内の字・番地等カナを入力してください</span>
    </div>
 
        </td>
      </tr>
      
      <tr>
      <td>代表者の役職</td>
      <td>
        <input type="text" v-model="aPLDaihyoshaYakushoku" @blur="checkDaihyoshaYakushokuValidity">
        <span class="error-message" v-if="isDaihyoshaYakushokuInvalid">255文字以内の代表者の役職等を入力してください</span>
      </td>
    </tr>
    <tr>
      <td>代表者の氏名</td>
      <td>
        <input type="text" v-model="aPLDaihyoshaName" @blur="checkDaihyoshaNameValidity">
        <span class="error-message" v-if="isDaihyoshaNameInvalid">40文字以内の代表者の氏名等を入力してください</span>
      </td>
    </tr>
    <tr>
      <td>法人番号</td>
      <td>
        <input type="text" v-model="aPLHojinNo" @blur="checkHojinNoValidity">
        <span class="error-message" v-if="isHojinNoInvalid">13桁以内の法人番号を入力してください</span>
      </td>
    </tr>
    <tr>
      <td>担当者の氏名</td>
      <td>
        <input type="text" v-model="aPLTantoshaName" @blur="checkTantoshaNameValidity">
        <span class="error-message" v-if="isTantoshaNameInvalid">255文字以内の担当者の氏名を入力してください</span>
      </td>
    </tr>
    <tr>
      <td>電話番号</td>
      <td><select v-model="selectedCountry">
      <option value="">国家選択してください</option>
      <option value="日本">日本+81</option>
      <option value="中国">中国+86</option>
    </select>
        <input type="text" v-model="aPLCSTEL" @blur="checkCSTELValidity">
        <span class="error-message" v-if="isCSTELInvalid">正しい11桁の数字を入力してください</span>
      </td>
    </tr>
    <tr>
      <td>FAX番号</td>
      <td>
        <input type="text" v-model="aPLCSFAX" @blur="checkCSFAXValidity">
        <span class="error-message" v-if="isCSFAXInvalid">11桁の数字を入力してください</span>
      </td>
    </tr>
    <tr>
      <td>担当者メールアドレス</td>
      <td>
        <input type="text" v-model="aPLCSTantoshaMail" @blur="checkCSTantoshaMailValidity">
        <span class="error-message" v-if="isCSTantoshaMailInvalid">正しいメールアドレスを入力してください</span>
      </td>
    </tr>
    <tr>
      <td>確認用メールアドレス</td>
      <td>
        <input type="text" v-model="aPLCSKakuninyoMail" @blur="checkCSKakuninyoMailValidity">
        <span class="error-message" v-if="isCSKakuninyoMailInvalid">確認用メールアドレスは一致するように設定してください。</span>
      </td>
    </tr>
    </table>
    <button class="custom-button" @click="goToQueren">内容確認</button>
    <button class="custom-button" @click="temporarySave">一时保存</button>
    <button class="custom-button" @click="goToWelcome">戻る</button>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';



export default {
  data() {
    return {
      now: '',
      aPLShinseisyaName: '',
      aPLAddressYubinNo3: '',
      aPLAddressYubinNo4: '',
      aPLAddressTodofuken: '',
      aPLAddressShikuchoson: '',
      aPLAddressBanchi: '',
      aPLAddressTodofukenKana: '',
      aPLAddressShikuchosonKana: '',
      aPLAddressBanchiKana: '',
      aPLAddressManshon: '',
      aPLDaihyoshaYakushoku: '',
      aPLDaihyoshaName: '',
      aPLHojinNo: '',
      aPLTantoshaName: '',
      aPLCSTEL: '',
      aPLCSFAX: '',
      aPLCSTantoshaMail: '',
      aPLCSKakuninyoMail: '',
      selectedCountry: '',
      isNameInvalid: false ,
      isPostalCodeFirstInvalid: false, 
      isPostalCodeSecondInvalid: false,
      isBuildingInvalid: false,
      isDaihyoshaYakushokuInvalid: false,
      isDaihyoshaNameInvalid: false,
      isHojinNoInvalid: false,
      isTantoshaNameInvalid: false,
      isCSTELInvalid: false,
      isCSFAXInvalid: false,
      isCSTantoshaMailInvalid: false,
      isCSKakuninyoMailInvalid: false,
      isTodofukenKanaInvalid: false,
      isShikuchosonKanaInvalid: false,
      isBanchiKanaInvalid: false,
    
    };
  },
  mounted() {
  const currentDate = new Date();
  this.now = currentDate.toLocaleString(); 
  this.restoreFormData();
  
},
  methods: {
    checkNameValidity() {
  this.isNameInvalid = this.aPLShinseisyaName.length === 0 || this.aPLShinseisyaName.length > 15;
},

checkPostalCodeValidity() {
  const postalCodeFirstPattern = /^[0-9]{3}$/;
  const postalCodeSecondPattern = /^[0-9]{4}$/;

  this.isPostalCodeFirstInvalid = !postalCodeFirstPattern.test(this.aPLAddressYubinNo3);
  this.isPostalCodeSecondInvalid = !postalCodeSecondPattern.test(this.aPLAddressYubinNo4);
},



checkBuildingValidity() {
  this.isBuildingInvalid = this.aPLAddressManshon.trim().length === 0 || this.aPLAddressManshon.length > 225;
},
checkDaihyoshaYakushokuValidity() {
      this.isDaihyoshaYakushokuInvalid = this.aPLDaihyoshaYakushoku.trim().length === 0 || this.aPLDaihyoshaYakushoku.length > 225;
    },
    checkDaihyoshaNameValidity() {
      this.isDaihyoshaNameInvalid = this.aPLDaihyoshaName.trim().length === 0 || this.aPLDaihyoshaName.length > 40;
    },
    checkHojinNoValidity() {
      this.isHojinNoInvalid = this.aPLHojinNo.trim().length === 0 || this.aPLHojinNo.length >13;
    },
    checkTantoshaNameValidity() {
      this.isTantoshaNameInvalid = this.aPLTantoshaName.trim().length === 0;
    },
    checkCSTELValidity() {
      this.isCSTELInvalid = this.aPLCSTEL.trim().length === 0 || this.aPLCSTEL.length > 11;
      this.isCSTELInvalid = false; 

if (this.selectedCountry === "日本") {
  
  const jpPhoneNumberRegex = /^0\d{9,10}$/;
  if (!jpPhoneNumberRegex.test(this.aPLCSTEL)) {
    this.isCSTELInvalid = true;
  }
} else if (this.selectedCountry === "中国") {
  
  const cnPhoneNumberRegex = /^1[3-9]\d{9}$/;
  if (!cnPhoneNumberRegex.test(this.aPLCSTEL)) {
    this.isCSTELInvalid = true;
  }
}
    },
    checkCSFAXValidity() {
      this.isCSFAXInvalid = this.aPLCSFAX.trim().length === 0 || this.aPLCSFAX.length > 11;
    },
    checkCSTantoshaMailValidity() {
      this.isCSTantoshaMailInvalid = this.aPLCSTantoshaMail.trim().length === 0;
    },
    
    checkCSKakuninyoMailValidity() {
  this.isCSKakuninyoMailInvalid = this.aPLCSKakuninyoMail.trim().length === 0;
  
  
  if (this.aPLCSTantoshaMail !== this.aPLCSKakuninyoMail) {
    this.isCSKakuninyoMailInvalid = true;
  }
},
    checkShikuchosonKanaValidity() {
      this.isShikuchosonKanaInvalid = this.aPLAddressShikuchosonKana.trim().length === 0;
    },
    checkBanchiKanaValidity() {
      this.isBanchiKanaInvalid = this.aPLAddressBanchiKana.trim().length === 0;
    },
    checkTodofukenKanaValidity() {
      this.isTodofukenKanaInvalid = this.aPLAddressTodofukenKana.trim().length === 0;
    },

    temporarySave() {
      // 保存表单数据到本地存储
      
      localStorage.setItem("formData", JSON.stringify(this.$data));
    },
    restoreFormData() {
      // 恢复保存的表单数据
      const formData = localStorage.getItem("formData");
      if (formData) {
        Object.assign(this.$data, JSON.parse(formData));
      }
    },
  goToQueren() {
    this.temporarySave();
  const query = {
    now: this.now,
    aPLShinseisyaName: this.aPLShinseisyaName,
    aPLAddressYubinNo3: this.aPLAddressYubinNo3,
    aPLAddressYubinNo4: this.aPLAddressYubinNo4,
    aPLAddressTodofuken: this.aPLAddressTodofuken,
    aPLAddressShikuchoson: this.aPLAddressShikuchoson,
    aPLAddressBanchi: this.aPLAddressBanchi,
    aPLAddressTodofukenKana: this.aPLAddressTodofukenKana,
    aPLAddressShikuchosonKana: this.aPLAddressShikuchosonKana,
    aPLAddressBanchiKana: this.aPLAddressBanchiKana,
    aPLAddressManshon: this.aPLAddressManshon,
    aPLDaihyoshaYakushoku: this.aPLDaihyoshaYakushoku,
    aPLDaihyoshaName: this.aPLDaihyoshaName,
    aPLHojinNo: this.aPLHojinNo,
    aPLTantoshaName: this.aPLTantoshaName,
    aPLCSTEL: this.aPLCSTEL,
    aPLCSFAX: this.aPLCSFAX,
    aPLCSTantoshaMail: this.aPLCSTantoshaMail,
    aPLCSKakuninyoMail: this.aPLCSKakuninyoMail
  };

  router.push({
    name: 'queren',
    query
  });
},



  goToWelcome() {
    this.$router.push({ name: 'welcome' });
  },
    fetchAddress() {
      if (this.aPLAddressYubinNo3 && this.aPLAddressYubinNo4) {
        const zipCode = this.aPLAddressYubinNo3 + this.aPLAddressYubinNo4;
        axios
          .get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`)
          .then((response) => {
            const data = response.data;
            if (data.status === 200 && data.results && data.results.length > 0) {
              const address = data.results[0];
              this.aPLAddressTodofuken = address.address1;
          this.aPLAddressShikuchoson = address.address2;
          this.aPLAddressBanchi = address.address3;
            } else {
              // 处理地址未找到的情况
            }
          })
          .catch((error) => {
            console.log(error);
            
          });
      }
    },
  },
};
</script>

<style scoped>
.xinguiding {
  text-align: center;
  margin-top: 50px;
}

.xingui {
  color: #007bff;
  font-size: 24px;
  margin-bottom: 20px;
}

table {
  width: 70%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

th {
  text-align: left;
}

input {
  width: 50%;
}

select {
  width: 50%;
}


.address-input {
  display: flex;
  align-items: center;
}

.postal-code-input {
  display: flex;
  align-items: center;
  margin-left: 5px;
}

td:nth-child(2) {
  text-align: left;
}
.custom-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
}

.custom-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
}
</style>
