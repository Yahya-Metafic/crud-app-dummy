import React, { useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface languageOptionsTypes {
  language: string;
  code: string;
}

const languageOptions: languageOptionsTypes[] = [
  {
    language: "English",
    code: "en",
  },
  {
    language: "Spanish",
    code: "es",
  },
  {
    language: "Hindi",
    code: "in",
  },
];

function LanguageSelector() {
  const [language, setLanguage] = useState(i18next.language);
  const { i18n } = useTranslation();

  const handleLanguageChange = (e: SelectChangeEvent) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  const { t } = useTranslation();

  return (
    <FormControl fullWidth variant="outlined" size="small" sx={{ width: 150 }}>
      <InputLabel id="language-label">{t("navbar.language")}</InputLabel>
      <Select
        labelId="language-label"
        id="language"
        value={language}
        label="Language"
        onChange={handleLanguageChange}
      >
        {languageOptions.map(({ language, code }, key) => (
          <MenuItem value={code} key={key}>
            {language}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default LanguageSelector;
