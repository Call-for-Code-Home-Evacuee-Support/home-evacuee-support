export default {
    ja: {
      Navbar: {
        title: '避難者支援アプリv0.1'
      },
      BasicInformation: {
        title: '基本情報の入力',
        location: '現在位置（自動入力）',
        latitude: '緯度',
        longitude: '経度',
        name: 'あなたの名前（必須）',
        zipcode: "郵便番号",
        address: '住所',
        email: 'Eメールアドレス',
        phone: '電話番号（必須）',
        shelter: "避難所",
        searchShelter: "最寄りの避難所を表示",
        shelterNotFound: "見つかりません",
        warningSupplyNum: "数量を1以上にしてください",
        warningAlreadyRequested: "すでにリクエストしています",
        noteNearestShelter: "あなたの最寄りの避難所："
      },
      FamilyInformation: {
        title: '家族情報の入力',
        member: '家族',
        relation: 'あなたとの関係',
        relationOptions: {
          you: "本人",
          partner: "配偶者",
          parent: "親",
          child: "子",
          other: "その他"
        },
        gender: "性別",
        genderOptions: {
          male: "男性",
          female: "女性",
          other: "その他"
        },
        age: "年齢",
        status: "特記事項",
        statusPlaceholder: "以下に該当する場合は選択して下さい",
        addFamily: "家族の追加",
        removeFamily: "削除",
        statusOptions: {
          pregnant: "妊娠中",
          disabled: "障害者",
          foreigner: "外国人",
          infant: "乳幼児",
          elderly: "高齢者"
        }
      },
      SuppliesInformation: {
        title: "救援物資",
        description: "物資の説明",
        request: "リクエスト",
        search: "検索",
        confirm: "確認",
        confirmText: "下記物資をリクエストしますか？",
        categories: "カテゴリ"
      },
      SubmitForm: {
        confirm: "確認",
        title: "その他",
        remarks: "備考"
      },
      Utils: {
        prev: "戻る",
        next: "次へ",
        submit: "送信"
      }
    }
  }