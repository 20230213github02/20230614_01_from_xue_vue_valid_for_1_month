<template>
  <div class="container">
    <table class="data-table">
      <thead>
        <tr>
          <th>属性</th>
          <th>值</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in formData" :key="key">
          <td>{{ key }}</td>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </table>
    <div class="button-container">
      <button class="custom-button" @click="savetodb">登録</button>
      <button class="custom-button" @click="goToXingui">戻る</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        now: new Date(this.$route.query.now).toISOString(),
        aPLShinseisyaName: this.$route.query.aPLShinseisyaName,
        aPLAddressYubinNo3: this.$route.query.aPLAddressYubinNo3,
        aPLAddressYubinNo4: this.$route.query.aPLAddressYubinNo4 ,
        aPLAddressTodofuken : this.$route.query.aPLAddressTodofuken ,
        aPLAddressShikuchoson : this.$route.query.aPLAddressShikuchoson ,
        aPLAddressBanchi : this.$route.query.aPLAddressBanchi ,
        aPLAddressTodofukenKana: this.$route.query.aPLAddressTodofukenKana ,
        aPLAddressShikuchosonKana : this.$route.query.aPLAddressShikuchosonKana ,
        aPLAddressBanchiKana : this.$route.query.aPLAddressBanchiKana ,
        aPLAddressManshon : this.$route.query.aPLAddressManshon ,
        aPLDaihyoshaYakushoku : this.$route.query.aPLDaihyoshaYakushoku ,
        aPLDaihyoshaName: this.$route.query.aPLDaihyoshaName,
        aPLHojinNo: this.$route.query.aPLHojinNo ,
        aPLTantoshaName: this.$route.query.aPLTantoshaName,
        aPLCSTEL: this.$route.query.aPLCSTEL ,
        aPLCSFAX: this.$route.query.aPLCSFAX ,
        aPLCSTantoshaMail: this.$route.query.aPLCSTantoshaMail ,
        aPLCSKakuninyoMail: this.$route.query.aPLCSKakuninyoMail,
      },
    };
  },
  methods: {
    savetodb() {
      const formData = {
       
        now: this.formData.now,
        aPLShinseisyaName: this.formData.aPLShinseisyaName,
        aPLAddressYubinNo3: this.formData.aPLAddressYubinNo3,
        aPLAddressYubinNo4: this.formData.aPLAddressYubinNo4,
        aPLAddressTodofuken: this.formData.aPLAddressTodofuken,
        aPLAddressShikuchoson: this.formData.aPLAddressShikuchoson,
        aPLAddressBanchi: this.formData.aPLAddressBanchi,
        aPLAddressTodofukenKana: this.formData.aPLAddressTodofukenKana,
        aPLAddressShikuchosonKana: this.formData.aPLAddressShikuchosonKana,
        aPLAddressBanchiKana: this.formData.aPLAddressBanchiKana,
        aPLAddressManshon: this.formData.aPLAddressManshon,
        aPLDaihyoshaYakushoku: this.formData.aPLDaihyoshaYakushoku,
        aPLDaihyoshaName: this.formData.aPLDaihyoshaName,
        aPLHojinNo: this.formData.aPLHojinNo,
        aPLTantoshaName: this.formData.aPLTantoshaName,
        aPLCSTEL: this.formData.aPLCSTEL,
        aPLCSFAX: this.formData.aPLCSFAX,
        aPLCSTantoshaMail: this.formData.aPLCSTantoshaMail,
        aPLCSKakuninyoMail: this.formData.aPLCSKakuninyoMail,
        
      };

      axios
        .post("http://localhost:8091/xingui/queren", this.formData)
        .then(() => {
          // 处理保存成功的逻辑
          console.log("22222"+this.formData.aPLShinseisyaName); 
          console.log("数据保存成功");
          this.$router.push({ name: "biebiao" });
        })
        .catch((error) => {
          // 处理保存失败的逻辑
          console.error("数据保存失败", error);
        });
    },
    goToXingui() {
      this.$router.push({ name: "xingui" });
    },
  },
};
</script>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.data-table th,
.data-table td {
  padding: 10px;
  border: 1px solid #ccc;
}

.button-container {
  text-align: center;
}

.custom-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.custom-button:last-child {
  margin-right: 0;
}
</style>
