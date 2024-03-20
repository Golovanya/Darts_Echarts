import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { useState } from "react";
import { ChipsChoice } from "@consta/uikit/Chips";
import { FieldGroup } from "@consta/uikit/FieldGroup";
import { Button } from "@consta/uikit/Button";
import { TextField } from "@consta/uikit/TextField";
import EChartsGauge from "./EChartsGauge";

const items = [
  {
    label: "301",
  },
  {
    label: "501",
  },
  {
    label: "701",
  },
];

import "./App.css";
import { Card } from "@consta/uikit/Card";

interface player {
  name:string,
  id:number,
  rate:number
}



function App() {
  const [mode, setMode] = useState("501");
  const [value, setValue] = useState("");
  const [players, setPlayers] =useState <player[]>([]);

  const handleAddPlayer = () => {
    const newPlayer = {
      name: value,
      id: Date.now(),
      rate: 0,
    };

    
    setPlayers([...players, newPlayer]);
    setValue(""); 
  };

  return (
    <Theme preset={presetGpnDefault}>
      <header>
        <ChipsChoice
          items={items}
          getItemLabel={(item) => item}
          onChange={(v) => setMode(v.label)}
          size="m"
        />

        <h1>Играем до {mode}</h1>
        <FieldGroup form="round">
          <TextField
            placeholder="Добавьте игрока"
            onChange={setValue}
            value={value}
          />
          <Button label="Добавить" onClick={handleAddPlayer} />
        </FieldGroup>
      </header>

      {players.length === 0 ? (
        <Card verticalSpace="4xl" horizontalSpace="4xl" status={"alert"}>
          <h1>Вас приветствует дартс!</h1>
          <p>Для начала игры выберите с какого числа будете сгонять сумму и добавьте игроков</p>
        </Card>
      ) : (
        <div className="game">
          {players.map((player) => (
            <EChartsGauge
              key={player.id}
              player={player}
              mode={mode}
            ></EChartsGauge>
          ))}
        </div>
      )}
    </Theme>
  );
}

export default App;
