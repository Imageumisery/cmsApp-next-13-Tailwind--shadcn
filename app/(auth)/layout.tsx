// export default function AuthLayout({ children }: { children: React.ReactNode }) {
//     return <div className="flex items-center justify-center h-full">{children}</div>;
// }
//same shit, different angle

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  )
}
export default AuthLayout
