export const metadata = {
  title: 'EcoTrack Pro',
  description: 'Contextual Carbon Analytics Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}