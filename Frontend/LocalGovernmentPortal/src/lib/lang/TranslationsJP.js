export default {
    ja: {
      Navbar: {
        title: '自治体向けポータル v0.1',
        home: 'ホーム',
        distribution: '物資配布プラン',
        vdistribution: 'Volunteer-Distribution-Plan',
        confirmation: "受け取り"
      },
      Sidebar: {
        districtFilter: "避難所",
        victimStatusFilter: "避難者ステータス"
      },
      DeliveriesTable: {
        title: "物資配布リスト",
        districtFilter: "避難所",
        statusFilter: "配布ステータス",
        filterAll: "全て",
        filterOptions: {
          null: "全て",
          todo: "未配布",
          doing: "配布中",
          done: "配布済"
        },
        shelterRadio: "Select Evacuation District",
        tableFields: {
          date: "リクエスト日時",
          name: "避難者名",
          contact: "連絡先",
          supply: "配布物資",
          status: "配布ステータス"
        },
        calculation: "配布計画作成",
        scheduler: {
          date: "日付",
          shelter: "避難所選択",
          startTime: "配布開始時刻",
          endTime: "配布終了時刻",
          spanTime: "配布間隔(時間)"
        }
        
      },
      DeliveriesMap: {
        title: "詳細情報",
        userInfo: "避難者情報",
        userData: {
          name: "名前",
          zipcode: "郵便番号",
          address: "住所",
          email: "メール",
          phone: "電話番号"  
        },
        button:{
          evacuees: "避難者",
          shelters: "避難所"
        },
        status:{
          pregnant: "妊娠中",
          disabled: "障がい者",
          foreigner: "外国人",
          normal: "一般"
        },
        deliveryInfo: "配送情報"
      },
      Confirmation: {
        title: "受け取り物資確認サービス",
        input: "電話番号を入力して下さい",
        basicInformation: "個人情報の確認",
        name: "お名前",
        phone: "電話番号",
        shelter: "最寄りの避難所",
        familyNum: "家族の人数",
        familyNumUnit: "名",
        distributionsInformation: "配布物資の確認",
        action: "上記物資を受け取りました",
        statusFilter: "受け取り状況指定",
        timeslotFilter: "受け取り時間指定",
        all: "すべて"
      } 
    }
  }
