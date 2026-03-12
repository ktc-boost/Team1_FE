import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '@/shared/components/shadcn/separator';

const meta = {
  title: 'Introduction/Getting Started',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function IntroductionPage() {
  return (
    <div className="min-h-screen bg-white px-10 py-12 text-gray-900">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-4">
          <h1 className="display2-bold">BOOST Design System</h1>
          <p className="body2-regular text-gray-600">
            BOOST 프로젝트의 디자인 시스템입니다.
            <br />
            Design Token과 Component 규칙을 일관되게 관리합니다.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="title2-bold">📌 Design Tokens</h2>
          <Separator />
          <ul className="body1-regular list-disc space-y-2 pl-6 text-gray-700">
            <li>Typography</li>
            <li>Color</li>
            <li>Spacing</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="title2-bold">🧩 Components</h2>
          <Separator />

          <ul className="body1-regular list-disc space-y-2 pl-6 text-gray-700">
            <li>Button</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="title2-bold">🚀 How to Use</h2>
          <Separator />
          <div className="rounded-xl bg-gray-200 px-4 py-3">
            <code className="label1-regular text-gray-800">pnpm storybook</code>
          </div>
          <p className="body2-regular text-gray-700">
            Storybook을 실행한 뒤 각 스토리를 탐색하며 BOOST의 디자인 시스템을 확인할 수 있습니다.
          </p>
        </section>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <IntroductionPage />,
};
