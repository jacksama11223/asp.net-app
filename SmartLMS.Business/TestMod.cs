namespace SmartLMS.Business;

public class TestMod
{
    public static void RunTest()
    {
        var svc = new ModerationService();
        Console.WriteLine(svc.IsSpamOrToxic("Tài liệu này khá hay @AI giải thích thêm nhé"));
        Console.WriteLine(svc.IsSpamOrToxic("test"));
    }
}
