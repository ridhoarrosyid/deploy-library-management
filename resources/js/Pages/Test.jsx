import Checkbox from '@/Components/Checkbox';
import { Label } from '@/Components/ui/label';

export default function Test() {
  return (
    <div>
      <Label for="test">Halo</Label>
      <Checkbox name="test" id="test" />
    </div>
  );
}
